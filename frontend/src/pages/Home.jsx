// import { useState } from "react";
// import axios from "axios";
// import { Menu, Sparkles, ImageIcon } from "lucide-react";
// import Sidebar from "../components/Sidebar";
// import StarRating from "../components/StarRating";
// import "../components/StarRating.css";

// export default function Home() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [theme, setTheme] = useState("Modern");
//   const [room, setRoom] = useState("Living Room");
//   const [dimensions, setDimensions] = useState("");
//   const [budget, setBudget] = useState("");
//   const [colorPalette, setColorPalette] = useState(""); // Default color
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [inputImageUrl, setInputImageUrl] = useState(null); // Store input image URL
//   const [isLoading, setIsLoading] = useState(false);
//   const [rating, setRating] = useState(0);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const colorNames = {
//     "#FF0000": "Red",
//     "#00FF00": "Green",
//     "#0000FF": "Blue",
//     "#FFFF00": "Yellow",
//     "#FFA500": "Orange",
//     "#800080": "Purple",
//     "#000000": "Black",
//     "#FFFFFF": "White",
//     // Add more colors as needed
//   };
  
//   const handleColorChange = (event) => {
//     const colorCode = event.target.value;
//     const colorName = colorNames[colorCode] || "Unknown";
//     console.log("Selected Color:", colorName);
//   };


//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleDesignRoom = async () => {
//     if (!image) {
//       alert("Please upload an image");
//       return;
//     }

//     setIsLoading(true);

//     // Create form data to send the image to Cloudinary
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "property_app");

//     try {
//       // Upload the image to Cloudinary
//       const cloudinaryResponse = await axios.post(
//         "https://api.cloudinary.com/v1_1/dw2o2w9zg/image/upload",
//         formData
//       );

//       console.log("Image uploaded:", cloudinaryResponse.data);
//       const imageUrl = cloudinaryResponse.data.secure_url;
//       setInputImageUrl(imageUrl); // Store the input image URL

//       // Now send the Cloudinary image URL along with theme, room, dimensions, budget, and color palette data to your backend for design generation
//       const backendResponse = await axios.post(
//         "http://localhost:5000/api/design-room",
//         {
//           image: imageUrl, // Send Cloudinary image URL
//           theme: theme,
//           room: room,
//           dimensions: dimensions,
//           budget: budget,
//           colorPalette: colorPalette,
//         }
//       );

//       setGeneratedImage(backendResponse.data.images[1]); // Assuming the backend returns an array of generated image URLs
//       console.log("Design generated:", backendResponse.data);
//     } catch (error) {
//       console.error("Error uploading image:", error.response || error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleSubmitRating = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/submit-rating", {
//         inputImageUrl: inputImageUrl, // Send the stored input image URL
//         outputImageUrl: generatedImage,
//         theme: theme,
//         room: room,
//         dimensions: dimensions,
//         budget: budget,
//         colorPalette: colorPalette,
//         rating: rating,
//         date: new Date()
//       });
//       alert("Rating submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting rating:", error.response || error.message);
//     }
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <button className="menu-button" onClick={toggleSidebar}>
//           <Menu />
//         </button>
//         <span>Home</span>
//       </header>

//       <div className="layout">
//         <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//         <main className="main-content">
//           <div className="top-section">
//             <div>
//               <h2 className="title">Upload a photo or image</h2>
//               <p className="subtitle">
//                 Upload an image of a room and let our AI generate a new design.
//               </p>
//             </div>
//             <button className="design-button" onClick={handleDesignRoom} disabled={isLoading}>
//               {isLoading ? "Designing..." : <><Sparkles /> Design this room</>}
//             </button>
//           </div>

//           <div className="selector-grid">
//             <div className="selector-group">
//               <label>Model</label>
//               <select className="select-input" value={theme} onChange={(e) => setTheme(e.target.value)}>
//                 <option>Modern</option>
//                 <option>Minimalistic</option>
//                 <option>Classic</option>
//               </select>
//             </div>
//             <div className="selector-group">
//               <label>Room type</label>
//               <select className="select-input" value={room} onChange={(e) => setRoom(e.target.value)}>
//                 <option>Living Room</option>
//                 <option>Bedroom</option>
//                 <option>Kitchen</option>
//               </select>
//             </div>
//             <div className="selector-group">
//               <label>Room Dimensions (L*W*H)</label>
//               <input
//                 type="text"
//                 className="select-input"
//                 placeholder="12*14*10"
//                 value={dimensions}
//                 onChange={(e) => setDimensions(e.target.value)}
//               />
//             </div>
//             <div className="selector-group">
//               <label>Budget</label>
//               <input
//                 type="text"
//                 className="select-input"
//                 placeholder="Enter your budget"
//                 value={budget}
//                 onChange={(e) => setBudget(e.target.value)}
//               />
//             </div>
//             <div className="selector-group">
//               <label>Color Palette</label>
//               <input
//                 type="color"
//                 className="select-input"
//                 value={colorPalette}
//                 // onChange={handleColorChange}
//                 onChange={(e) => setColorPalette(e.target.value)}
//                 style={{ width: '50px', height: '50px' }} // Adjust the size as needed
//               />
//             </div>
//           </div>

//           <div className="content-area">
//             <div className="upload-area">
//               <ImageIcon />
//               <input type="file" onChange={handleImageUpload} />
//               <p>Drag 'n drop your image here or click to upload</p>
//               {imagePreview && <img src={imagePreview} alt="Selected" className="image-preview" />}
//             </div>

//             {generatedImage && (
//               <div className="output-area">
//                 <Sparkles />
//                 <p>AI-generated output goes here</p>
//                 <img src={generatedImage} alt="Generated Design" />
//               </div>
//             )}

//             {generatedImage && (
//               <div className="rating-card">
//                 <h3>Rate this design:</h3>
//                 <StarRating rating={rating} onRatingChange={handleRatingChange} />
//                 <button onClick={handleSubmitRating}>Submit Feedback</button>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import axios from "axios";
// import { Menu, Sparkles, ImageIcon } from "lucide-react";
// import Sidebar from "../components/Sidebar";
// import StarRating from "../components/StarRating";
// import "../components/StarRating.css";

// export default function Home() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [theme, setTheme] = useState("");
//   const [room, setRoom] = useState("");
//   const [dimensions, setDimensions] = useState("12*14*10");
//   const [budget, setBudget] = useState("");
//   const [colorPalette, setColorPalette] = useState(""); // Default color
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [inputImageUrl, setInputImageUrl] = useState(null); // Store input image URL
//   const [isLoading, setIsLoading] = useState(false);
//   const [rating, setRating] = useState(0);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleDesignRoom = async () => {
//     if (!image) {
//       alert("Please upload an image");
//       return;
//     }

//     setIsLoading(true);

//     // Create form data to send the image to Cloudinary
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "property_app");

//     try {
//       // Upload the image to Cloudinary
//       const cloudinaryResponse = await axios.post(
//         "https://api.cloudinary.com/v1_1/dw2o2w9zg/image/upload",
//         formData
//       );

//       console.log("Image uploaded:", cloudinaryResponse.data);
//       const imageUrl = cloudinaryResponse.data.secure_url;
//       setInputImageUrl(imageUrl); // Store the input image URL

//       // Now send the Cloudinary image URL along with theme, room, dimensions, budget, and color palette data to your backend for design generation
//       const backendResponse = await axios.post(
//         "http://localhost:5000/api/design-room",
//         {
//           image: imageUrl, // Send Cloudinary image URL
//           theme: theme,
//           room: room,
//           dimensions: dimensions,
//           budget: budget,
//           colorPalette: colorPalette,
//         }
//       );

//       setGeneratedImage(backendResponse.data.images[1]); // Assuming the backend returns an array of generated image URLs
//       console.log("Design generated:", backendResponse.data);
//     } catch (error) {
//       console.error("Error uploading image:", error.response || error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleSubmitRating = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/submit-rating", {
//         inputImageUrl: inputImageUrl, // Send the stored input image URL
//         outputImageUrl: generatedImage,
//         theme: theme,
//         room: room,
//         dimensions: dimensions,
//         budget: budget,
//         colorPalette: colorPalette,
//         rating: rating,
//         date: new Date()
//       });
//       alert("Rating submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting rating:", error.response || error.message);
//     }
//   };

//   const predefinedColors = [
//     { name: "Red", value: "Red" },
//     { name: "Green", value: "Green" },
//     { name: "Blue", value: "Blue" },
//     { name: "Yellow", value: "Yellow" },
//     { name: "Orange", value: "Orange" },
//     { name: "Purple", value: "Purple" },
//     { name: "Black", value: "Black" },
//     { name: "White", value: "White" },
//   ];

//   return (
//     <div className="app">
//       {/* <header className="header">
//         <button className="menu-button" onClick={toggleSidebar}>
//           <Menu />
//         </button>
//         <span>Home</span>
//       </header> */}

//       <div className="layout">
//         <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//         <main className="main-content">
//           <div className="top-section">
//             <div>
//               <h2 className="title">Upload a photo or image</h2>
//               <p className="subtitle">
//                 Upload an image of a room and let our AI generate a new design.
//               </p>
//             </div>
//             <button className="design-button" onClick={handleDesignRoom} disabled={isLoading}>
//               {isLoading ? "Designing..." : <><Sparkles /> Design this room</>}
//             </button>
//           </div>

//           <div className="selector-grid">
//             <div className="selector-group">
//               <label>Model</label>
//               <select className="select-input" value={theme} onChange={(e) => setTheme(e.target.value)}>
//                 <option>Modern</option>
//                 <option>Minimalistic</option>
//                 <option>Classic</option>
//               </select>
//             </div>
//             <div className="selector-group">
//               <label>Room type</label>
//               <select className="select-input" value={room} onChange={(e) => setRoom(e.target.value)}>
//                 <option>Living Room</option>
//                 <option>Bedroom</option>
//                 <option>Kitchen</option>
//               </select>
//             </div>
//             {/* <div className="selector-group">
//               <label>Room Dimensions (L*W*H)</label>
//               <input
//                 type="text"
//                 className="select-input"
//                 placeholder="12*14*10"
//                 value={dimensions}
//                 onChange={(e) => setDimensions(e.target.value)}
//               />
//             </div> */}
//             <div className="selector-group">
//               <label>Budget</label>
//               <input
//                 type="text"
//                 className="select-input"
//                 placeholder="Enter your budget"
//                 value={budget}
//                 onChange={(e) => setBudget(e.target.value)}
//               />
//             </div>
//             <div className="selector-group">
//               <label>Color Palette</label>
//               <select
//                 className="select-input"
//                 value={colorPalette}
//                 onChange={(e) => setColorPalette(e.target.value)}
//               >
//                 {predefinedColors.map((color) => (
//                   <option key={color.value} value={color.value}>
//                     {color.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="content-area">
//             <div className="upload-area">
//               <ImageIcon />
//               <input type="file" onChange={handleImageUpload} />
//               <p>Only upload the pics without text for better output</p>
//               {imagePreview && <img src={imagePreview} alt="Selected" className="image-preview" />}
//             </div>

//             {generatedImage && (
//               <div className="output-area">
//                 <Sparkles />
//                 <p>AI-generated output goes here</p>
//                 <img src={generatedImage} alt="Generated Design" />
//               </div>
//             )}

//             {generatedImage && (
//               <div className="rating-card">
//                 <h3>Rate this design:</h3>
//                 <StarRating rating={rating} onRatingChange={handleRatingChange} />
//                 <button className="design-button" onClick={handleSubmitRating}>Submit Rating</button>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { Menu, Sparkles, ImageIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StarRating from "../components/StarRating";
import "../components/StarRating.css";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [theme, setTheme] = useState("");
  const [room, setRoom] = useState("");
  const [dimensions, setDimensions] = useState("12*14*10");
  const [budget, setBudget] = useState("");
  const [colorPalette, setColorPalette] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [inputImageUrl, setInputImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDesignRoom = async () => {
    if (!image || !theme || !room || !budget || !colorPalette) {
      alert("Please fill in all fields.");
      return;
    }

    if (budget < 50000) {
      alert("Budget must be at least 50,000.");
      return;
    }

    setIsLoading(true);

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
          dimensions: dimensions,
          budget: budget,
          colorPalette: colorPalette,
        }
      );

      setGeneratedImage(backendResponse.data.images[1]);
    } catch (error) {
      console.error("Error uploading image:", error.response || error.message);
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
        dimensions: dimensions,
        budget: budget,
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
            <button className="design-button" onClick={handleDesignRoom} disabled={isLoading}>
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
                placeholder="Select a model"
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
                placeholder="Select a room type"
              >
                <option value="">Select a room type</option>
                <option>Living Room</option>
                <option>Bedroom</option>
                <option>Kitchen</option>
              </select>
            </div>

            <div className="selector-group">
              <label>Budget</label>
              <input
                type="text"
                className="select-input"
                placeholder="Enter your budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="selector-group">
              <label>Color Palette</label>
              <select
                className="select-input"
                value={colorPalette}
                onChange={(e) => setColorPalette(e.target.value)}
                placeholder="Select a color palette"
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
              {imagePreview && <img src={imagePreview} alt="Selected" className="image-preview" />}
            </div>

            {generatedImage && (
              <div className="output-area">
                <Sparkles />
                <p>AI-generated output goes here</p>
                <img src={generatedImage} alt="Generated Design" />
              </div>
            )}

            {generatedImage && (
              <div className="rating-card">
                <h3>Rate this design:</h3>
                <StarRating rating={rating} onRatingChange={handleRatingChange} />
                <button className="design-button" onClick={handleSubmitRating}>
                  Submit Rating
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
