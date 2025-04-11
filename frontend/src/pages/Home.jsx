import { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, ImageIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StarRating from "../components/StarRating";
import "../components/StarRating.css";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [theme, setTheme] = useState("");
  const [room, setRoom] = useState("");
  const [colorPalette, setColorPalette] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [inputImageUrl, setInputImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDesignRoom = async () => {
    if (!image || !theme || !room || !colorPalette) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "property_app");

    try {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dw2o2w9zg/image/upload",
        formData
      );
      const imageUrl = cloudinaryResponse.data.secure_url;
      setInputImageUrl(imageUrl);

      const backendResponse = await axios.post(
        "http://localhost:5000/api/design-room",
        {
          image: imageUrl,
          theme: theme,
          room: room,
          colorPalette: colorPalette,
        }
      );
      const generatedImageUrl = backendResponse.data.image;
      setGeneratedImage(generatedImageUrl);

      const searchResponse = await axios.post(
        "http://localhost:5000/api/search-similar-products",
        { imageUrl: generatedImageUrl }
      );

      if (searchResponse.data && searchResponse.data.length > 0) {
        setSimilarProducts(searchResponse.data);
      } else {
        setSimilarProducts([]);
      }
    } catch (error) {
      console.error("Error in design room or searching similar products:", error.response || error.message);
      setErrorMessage("Something went wrong while generating design or fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitRating = async () => {
    try {
      await axios.post("http://localhost:5000/api/submit-rating", {
        inputImageUrl: inputImageUrl,
        outputImageUrl: generatedImage,
        theme: theme,
        room: room,
        colorPalette: colorPalette,
        rating: rating,
        date: new Date(),
      });
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error.response || error.message);
    }
  };

  const predefinedColors = [
    { name: "Red", value: "Red" },
    { name: "Green", value: "Green" },
    { name: "Blue", value: "Blue" },
    { name: "Yellow", value: "Yellow" },
    { name: "Orange", value: "Orange" },
    { name: "Purple", value: "Purple" },
    { name: "Black", value: "Black" },
    { name: "White", value: "White" },
  ];

  useEffect(() => {
    console.log("Similar Products:", similarProducts);
  }, [similarProducts]);

  return (
    <div className="app">
      <div className="layout">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="main-content">
          <div className="top-section">
            <div>
              <h2 className="title">Upload a photo or image</h2>
              <p className="subtitle">
                Upload an image of a room and let our AI generate a new design.
              </p>
            </div>
            <button
              className="design-button"
              onClick={handleDesignRoom}
              disabled={isLoading}
            >
              {isLoading ? "Designing..." : <><Sparkles /> Design this room</>}
            </button>
          </div>

          <div className="selector-grid">
            <div className="selector-group">
              <label>Model</label>
              <select
                className="select-input"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="">Select a theme</option>
                <option>Modern</option>
                <option>Minimalistic</option>
                <option>Classic</option>
              </select>
            </div>

            <div className="selector-group">
              <label>Room type</label>
              <select
                className="select-input"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="">Select a room type</option>
                <option>Living Room</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
              </select>
            </div>

            <div className="selector-group">
              <label>Color Palette</label>
              <select
                className="select-input"
                value={colorPalette}
                onChange={(e) => setColorPalette(e.target.value)}
              >
                <option value="">Select a color</option>
                {predefinedColors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="content-area">
            <div className="upload-area">
              <ImageIcon />
              <input type="file" onChange={handleImageUpload} />
              <p>Only upload the pics without text for better output</p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="image-preview"
                />
              )}
            </div>

            {generatedImage && (
              <div className="output-area">
                <Sparkles />
                <p>AI-generated output goes here</p>
                <img
                  src={generatedImage}
                  alt="Generated Design"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {generatedImage && (
              <div className="rating-card">
                <h3>Rate this design:</h3>
                <StarRating rating={rating} onRatingChange={handleRatingChange} />
                <button className="design-button" onClick={handleSubmitRating}>
                  Submit Rating
                </button>
              </div>
            )}

            {similarProducts.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>Similar Products:</h3>
                <div className="product-list">
                  {similarProducts.map((product, index) => (
                    <div key={index} className="product-card">
                      <img
                        src={product.image.link}
                        alt={product.title}
                        className="product-image"
                      />
                      <h4>{product.title}</h4>
                      <p>Price: {product.price}</p>
                      <a href={product.link} target="_blank" rel="noreferrer">
                        <button className="buy-button">Buy Now</button>
                      </a>
                    </div>
                  ))}
                </div>
                <style>{`
                  .product-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                  }
                  .product-card {
                    background-color: #1f2937;
                    color: #fff;
                    border-radius: 12px;
                    padding: 1rem;
                    text-align: center;
                    transition: transform 0.2s ease;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                  }
                  .product-card:hover {
                    transform: scale(1.03);
                  }
                  .product-image {
                    width: 100%;
                    height: 160px;
                    object-fit: cover;
                    border-radius: 10px;
                    margin-bottom: 10px;
                  }
                  .buy-button {
                    margin-top: 10px;
                    padding: 8px 16px;
                    background-color: #10b981;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                  }
                  .buy-button:hover {
                    background-color: #059669;
                  }
                `}</style>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
