

// require('dotenv').config();
// const express = require('express');
// const Replicate = require('replicate');
// const cors = require('cors');
// const axios = require('axios');
// const FormData = require('form-data');
// const { writeFile } = require('node:fs/promises');
// const fs = require('fs');

// const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// if (!REPLICATE_API_TOKEN) {
//   console.error('Error: REPLICATE_API_TOKEN is not defined. Please check your .env file.');
//   process.exit(1);
// }

// // Setup Express app
// const app = express();
// const port = 5000;
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());

// // API route to handle room design generation
// app.post('/api/design-room', async (req, res) => {
//   try {
//     const { image, theme, room, dimensions, budget, colorPalette } = req.body; // Receive the image URL directly from frontend

//     // Check if the image URL is provided
//     if (!image) {
//       return res.status(400).json({ error: 'Image URL is required' });
//     }

//     console.log('Image URL:', image);
//     console.log('Theme:', theme);
//     console.log('Room:', room);
//     console.log('Dimensions:', dimensions);
//     console.log('Budget:', budget);
//     console.log('Color Palette:', colorPalette);

//     // Setup Replicate API for AI image generation
//     const replicate = new Replicate({
//       auth: REPLICATE_API_TOKEN, // Use your Replicate API Token
//     });

//     const model = 'jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b'; // Model ID

//     const input = {
//       image, // Use the image URL received from frontend
//       prompt: `A ${theme} ${room} Editorial Style Photo, Dimensions: ${dimensions}, Budget: ${budget}$, Room Color should be: ${colorPalette}, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
//       a_prompt: `best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`,
//     };

//     // Run the model on Replicate
//     const output = await replicate.run(model, { input });

//     // Log the output to understand its structure
//     console.log('Output:', output);

//     // Upload the generated images to Cloudinary
//     const uploadPromises = output.map(async (item, index) => {
//       const filePath = `output_${index}.png`;
//       await writeFile(filePath, item);

//       const formData = new FormData();
//       formData.append("file", fs.createReadStream(filePath));
//       formData.append("upload_preset", "property_app");

//       const cloudinaryResponse = await axios.post(
//         "https://api.cloudinary.com/v1_1/dw2o2w9zg/image/upload",
//         formData,
//         {
//           headers: formData.getHeaders(),
//         }
//       );
//       console.log(cloudinaryResponse.data);

//       return cloudinaryResponse.data.secure_url;
//     });

//     const uploadedUrls = await Promise.all(uploadPromises);

//     // Assuming output is an array of URLs
//     if (!uploadedUrls || uploadedUrls.length === 0) {
//       return res.status(500).json({ error: 'Something went wrong' });
//     }

//     // Send the generated image URLs back to the frontend
//     return res.status(201).json({ images: uploadedUrls }); // Assuming uploadedUrls contains the generated image URLs
//   } catch (error) {
//     console.log('Error:', error);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


// require('dotenv').config();
// const express = require('express');
// const Replicate = require('replicate');
// const cors = require('cors');
// const axios = require('axios');
// const FormData = require('form-data');
// const { writeFile } = require('node:fs/promises');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const Rating = require('./models/Rating');

// const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

// if (!REPLICATE_API_TOKEN) {
//   console.error('Error: REPLICATE_API_TOKEN is not defined. Please check your .env file.');
//   process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Setup Express app
// const app = express();
// const port = 5000;
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());

// // API route to handle room design generation
// app.post('/api/design-room', async (req, res) => {
//   try {
//     const { image, theme, room, dimensions, budget, colorPalette } = req.body; // Receive the image URL directly from frontend

//     // Check if the image URL is provided
//     if (!image) {
//       return res.status(400).json({ error: 'Image URL is required' });
//     }

//     console.log('Image URL:', image);
//     console.log('Theme:', theme);
//     console.log('Room:', room);
//     console.log('Dimensions:', dimensions);
//     console.log('Budget:', budget);
//     console.log('Color Palette:', colorPalette);

//     // Setup Replicate API for AI image generation
//     const replicate = new Replicate({
//       auth: REPLICATE_API_TOKEN, // Use your Replicate API Token
//     });

//     const model = 'jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b'; // Model ID

//     const input = {
//       image, // Use the image URL received from frontend
//       prompt: `A ${theme} ${room} Editorial Style Photo, Dimensions: ${dimensions}, Budget: ${budget}$, Room Color should be: ${colorPalette}, Symmetry, Straight On, Modern Living Room, Large Window, Leather, Glass, Metal, Wood Paneling, Neutral Palette, Ikea, Natural Light, Apartment, Afternoon, Serene, Contemporary, 4k`,
//       a_prompt: `best quality, extremely detailed, photo from Pinterest, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning`,
//     };

//     // Run the model on Replicate
//     const output = await replicate.run(model, { input });

//     // Log the output to understand its structure
//     console.log('Output:', output);

//     // Upload the generated images to Cloudinary
//     const uploadPromises = output.map(async (item, index) => {
//       const filePath = `output_${index}.png`;
//       await writeFile(filePath, item);

//       const formData = new FormData();
//       formData.append("file", fs.createReadStream(filePath));
//       formData.append("upload_preset", "property_app");

//       const cloudinaryResponse = await axios.post(
//         "https://api.cloudinary.com/v1_1/dw2o2w9zg/image/upload",
//         formData,
//         {
//           headers: formData.getHeaders(),
//         }
//       );
//       console.log(cloudinaryResponse.data);

//       return cloudinaryResponse.data.secure_url;
//     });

//     const uploadedUrls = await Promise.all(uploadPromises);

//     // Assuming output is an array of URLs
//     if (!uploadedUrls || uploadedUrls.length === 0) {
//       return res.status(500).json({ error: 'Something went wrong' });
//     }

//     // Send the generated image URLs back to the frontend
//     return res.status(201).json({ images: uploadedUrls }); // Assuming uploadedUrls contains the generated image URLs
//   } catch (error) {
//     console.log('Error:', error);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// // API route to handle rating submission
// app.post('/api/submit-rating', async (req, res) => {
//   try {
//     const { inputImageUrl, outputImageUrl, theme, room, dimensions, budget, colorPalette, rating } = req.body;
//     console.log(rating);
//     // Create a new rating document
//     const newRating = new Rating({
//       inputImageUrl,
//       outputImageUrl,
//       theme,
//       room,
//       dimensions,
//       budget,
//       colorPalette,
//       rating,
//       date: new Date()
//     });

//     // Save the rating document to the database
//     await newRating.save();

//     return res.status(200).json({ message: 'Rating submitted successfully' });
//   } catch (error) {
//     console.log('Error:', error);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// });


// app.get('/api/ratings', async (req, res) => {
//   try {
//     const ratings = await Rating.find();
//     return res.status(200).json(ratings);
//   } catch (error) {
//     console.log('Error:', error);
//     return res.status(500).json({ error: 'Something went wrong' });
//   }
// });



// // Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


require('dotenv').config();
const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');
const axios = require('axios');
const FormData = require('form-data');
const { writeFile } = require('node:fs/promises');
const fs = require('fs');
const mongoose = require('mongoose');
const Rating = require('./models/Rating');

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN is not defined. Please check your .env file.');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Setup Express app
const app = express();
const port = 5000;
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// API route to handle room design generation
app.post('/api/design-room', async (req, res) => {
  try {
    const { image, theme, room, dimensions, budget, colorPalette } = req.body; // Receive the image URL directly from frontend

    // Check if the image URL is provided
    if (!image) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    console.log('Image URL:', image);
    console.log('Theme:', theme);
    console.log('Room:', room);
    console.log('Dimensions:', dimensions);
    console.log('Budget:', budget);
    console.log('Color Palette:', colorPalette);

    // Setup Replicate API for AI image generation
    const replicate = new Replicate({
      auth: REPLICATE_API_TOKEN, // Use your Replicate API Token
    });

    const model = 'jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b'; // Model ID

const input = {
  image, // Use the image URL received from frontend
  prompt: `A ${theme} ${room} Editorial Style Photo with the following details: 
  - Dimensions: ${dimensions}
  - Budget: ${budget}$
  - Room Color Palette: ${colorPalette}
  - Design Style: Symmetry, Straight-On, Contemporary, Modern, Serene
  - Materials: Leather, Glass, Metal, Wood Paneling
  - Lighting: Natural Light, Afternoon Setting
  - Specific Features: Large Window, Ikea-inspired, Cozy yet Elegant Atmosphere
  - Resolution: 4K 
  - Ensure the color scheme strictly follows: ${colorPalette}, making it visually prominent in the furniture, walls, and decor.`,
  
  a_prompt: `best quality, extremely detailed, realistic interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning, color-accurate, furniture and decor with ${colorPalette}, well-balanced composition, high-end editorial photography`,
};



    // Run the model on Replicate
    const output = await replicate.run(model, { input });

    // Log the output to understand its structure
    console.log('Output:', output);

    // Upload the generated images to Cloudinary
    const uploadPromises = output.map(async (item, index) => {
      const filePath = `output_${index}.png`;
      await writeFile(filePath, item);

      const formData = new FormData();
      formData.append("file", fs.createReadStream(filePath));
      formData.append("upload_preset", "property_app");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dw2o2w9zg/image/upload",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
      console.log(cloudinaryResponse.data);

      return cloudinaryResponse.data.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    // Assuming output is an array of URLs
    if (!uploadedUrls || uploadedUrls.length === 0) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    // Send the generated image URLs back to the frontend
    return res.status(201).json({ images: uploadedUrls }); // Assuming uploadedUrls contains the generated image URLs
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// API route to handle rating submission
app.post('/api/submit-rating', async (req, res) => {
  try {
    const { inputImageUrl, outputImageUrl, theme, room, dimensions, budget, colorPalette, rating } = req.body;
    console.log(rating);
    // Create a new rating document
    const newRating = new Rating({
      inputImageUrl,
      outputImageUrl,
      theme,
      room,
      dimensions,
      budget,
      colorPalette,
      rating,
      date: new Date()
    });

    // Save the rating document to the database
    await newRating.save();

    return res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// API route to fetch all ratings
app.get('/api/ratings', async (req, res) => {
  try {
    const ratings = await Rating.find();
    console.log(ratings)
    return res.status(200).json( {ratings} ); // Return data in JSON object
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/ratings/:id', async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    console.log(rating)
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    return res.status(200).json(rating);
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});