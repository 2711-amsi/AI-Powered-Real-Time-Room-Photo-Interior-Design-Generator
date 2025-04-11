require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const { default: fetch } = require("node-fetch");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB schema
const ratingSchema = new mongoose.Schema({
  inputImageUrl: String,
  outputImageUrl: String,
  theme: String,
  room: String,
  colorPalette: String,
  rating: Number,
  date: Date,
});

const Rating = mongoose.model("Rating", ratingSchema);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route: AI-based room redesign
app.post("/api/design-room", async (req, res) => {
  const { image, theme, room, colorPalette, dimensions } = req.body;

  const prompt = `A ${room} designed in a ${theme} style with a ${colorPalette} color palette and dimensions of ${dimensions}`;

  const replicateRes = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "2a360362540e1f6cfe59c9db4aa8aa9059233d40e638aae0cdeb6b41f3d0dcce",
      input: {
        image,
        prompt,
        scale: 7,
        ddim_steps: 20,
        a_prompt: "high quality, detailed, modern interior",
        n_prompt: "low resolution, blurry, distorted",
        seed: Math.floor(Math.random() * 100000),
      },
    }),
  });

  const prediction = await replicateRes.json();

  if (!prediction?.urls?.get) {
    return res.status(500).json({ error: "Failed to start prediction" });
  }

  // Polling until image is ready
  let outputImage = null;
  let status = prediction.status;

  while (status !== "succeeded" && status !== "failed") {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const resultRes = await fetch(prediction.urls.get, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    });
    const result = await resultRes.json();
    status = result.status;

    if (status === "succeeded") {
      outputImage = result.output;
    }
  }

  if (!outputImage) {
    return res.status(500).json({ error: "Prediction failed to produce output" });
  }

  const finalImage = Array.isArray(outputImage) ? outputImage[0] : outputImage;
  console.log("Final Image URL:", finalImage);
  res.json({ image: finalImage });
});

// Route: Submit rating
app.post("/api/submit-rating", async (req, res) => {
  const newRating = new Rating(req.body);
  try {
    await newRating.save();
    res.json({ message: "Rating saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save rating" });
  }
});

// Route: Fetch history
app.get("/api/ratings", async (req, res) => {
  try {
    const allRatings = await Rating.find().sort({ date: -1 });
    res.json(allRatings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

// Route: Search similar products (Cloudinary conversion + SearchAPI)
app.post("/api/search-similar-products", async (req, res) => {
  const { imageUrl } = req.body;

  try {
    console.log("Original Image URL:", imageUrl);

    // Upload to Cloudinary and convert to PNG (corrected format as per original code)
    const uploadRes = await cloudinary.uploader.upload(imageUrl, {
      format: "png",  // This should be 'png' instead of 'jpeg' for a PNG image conversion
    });

    const jpegUrl = uploadRes.secure_url;
    console.log("Cloudinary PNG URL:", jpegUrl);

    // Call SearchAPI with Cloudinary PNG URL
    const url = "https://www.searchapi.io/api/v1/search";
    const params = {
      engine: "google_lens",
      search_type: "products",
      url: jpegUrl,
      country: "in",
      api_key: "y35qeiXEFvyGtfXdnx2dxRY6",
    };

    try {
      const response = await axios.get(url, { params });
      let products = response.data.visual_matches || [];

      // Filter products to only include those with price in INR (₹)
      products = products.filter(product =>
        product.price && product.price.includes('₹')
      );

      res.json(products);
    } catch (error) {
      console.error('Error fetching similar products:', error.message);
      res.status(500).json({ message: 'Error fetching similar products', error: error.message });
    }

  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message);
    res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
