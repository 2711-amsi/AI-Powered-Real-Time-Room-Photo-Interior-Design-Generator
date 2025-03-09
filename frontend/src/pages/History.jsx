
// import { useEffect, useState } from "react";

// const History = () => {
//   const [ratings, setRatings] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/ratings") // Adjust the API URL if needed
//       .then((response) => response.json())
//       .then((data) => setRatings(data.ratings)) // Make sure to extract the 'ratings' key
//       .catch((error) => console.error("Error fetching ratings:", error));
//   }, []);

//   return (
    
//     <div>
//       <h2>Ratings</h2>
//       <ul>
//         {ratings.map((rating) => (
//           <li key={rating._id}>
//             <p>Theme: {rating.theme}</p>
//             <p>Room: {rating.room}</p>
//             <p>Dimensions: {rating.dimensions}</p>
//             <p>Budget: ${rating.budget}</p>
//             <p>Color Palette: <span style={{ color: rating.colorPalette }}>{rating.colorPalette}</span></p>
//             <p>Rating: {rating.rating} ⭐</p>
//             <p>Date: {new Date(rating.date).toLocaleString()}</p>
//             <img src={rating.outputImageUrl} alt="Room Design" width="200" />
//             <hr />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default History;


// import { useEffect, useState } from "react";
// import { Menu } from "lucide-react";
// import Sidebar from "../components/Sidebar";

// const History = () => {
//   const [ratings, setRatings] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/ratings") // Adjust the API URL if needed
//       .then((response) => response.json())
//       .then((data) => setRatings(data.ratings)) // Ensure the correct data key
//       .catch((error) => console.error("Error fetching ratings:", error));
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="app">
//       {/* <header className="header">
//         <button className="menu-button" onClick={toggleSidebar}>
//           <Menu />
//         </button>
//         <span className="ml-4 text-lg font-semibold">History</span>
//       </header> */}

//       <div className="layout flex">
//         <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//         <main className="main-content flex-1 p-6">
//           <div className="history-page">
//             <h1 className="title text-xl font-bold mb-4">Design History</h1>
//             <div className="history-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {ratings.length > 0 ? (
//                 ratings.map((rating) => (
//                   <div key={rating._id} className="border p-4 rounded-lg shadow-md">
//                     <p><strong>Theme:</strong> {rating.theme}</p>
//                     <p><strong>Room:</strong> {rating.room}</p>
//                     <p><strong>Dimensions:</strong> {rating.dimensions}</p>
//                     <p><strong>Budget:</strong> ${rating.budget}</p>
//                     <p>
//                       <strong>Color Palette:</strong>{" "}
//                       <span style={{ color: rating.colorPalette }}>{rating.colorPalette}</span>
//                     </p>
//                     <p><strong>Rating:</strong> {rating.rating} ⭐</p>
//                     <p><strong>Date:</strong> {new Date(rating.date).toLocaleString()}</p>
//                     {rating.outputImageUrl && (
//                       <img src={rating.outputImageUrl} alt="Room Design" className="mt-2 w-full h-40 object-cover rounded" />
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p>No designs yet</p>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default History

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu } from "lucide-react";
// import Sidebar from "../components/Sidebar";
// import "./History.css"; // Importing the CSS file

// const History = () => {
//   const [ratings, setRatings] = useState([]);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/ratings") // Adjust the API URL if needed
//       .then((response) => response.json())
//       .then((data) => setRatings(data.ratings)) // Ensure the correct data key
//       .catch((error) => console.error("Error fetching ratings:", error));
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="app">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//       {/* Main Content */}
//       <div className="main-content">
//         <header className="header">
//           <button className="menu-button" onClick={toggleSidebar}>
//             <Menu />
//           </button>
//           <span className="title">History</span>
//         </header>

//         <main className="history-container">
//           <h1 className="history-title">Design History</h1>

//           <div className="history-list">
//             {ratings.length > 0 ? (
//               ratings.map((rating) => (
//                 <div key={rating._id} className="history-card">
//                   {/* Clickable Image */}
//                   {rating.outputImageUrl && (
//                     <Link to={`/history/${rating._id}`} className="image-link">
//                       <img src={rating.outputImageUrl} alt="Room Design" className="history-image" />
//                     </Link>
//                   )}

//                   {/* Content Section */}
//                   <div className="history-details">
//                     <p><strong>Theme:</strong> {rating.theme}</p>
//                     <p><strong>Room:</strong> {rating.room}</p>
//                     <p><strong>Dimensions:</strong> {rating.dimensions}</p>
//                     <p><strong>Budget:</strong> ${rating.budget}</p>
//                     <p>
//                       <strong>Color Palette:</strong>{" "}
//                       <span className="color-palette" style={{ color: rating.colorPalette }}>
//                         {rating.colorPalette}
//                       </span>
//                     </p>
//                     <p className="rating"><strong>Rating:</strong> {rating.rating} ⭐</p>
//                     <p className="date"><strong>Date:</strong> {new Date(rating.date).toLocaleString()}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="no-designs">No designs yet</p>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default History;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";

const History = () => {
  const [ratings, setRatings] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/ratings") // Adjust the API URL if needed
      .then((response) => response.json())
      .then((data) => setRatings(data.ratings)) // Ensure the correct data key
      .catch((error) => console.error("Error fetching ratings:", error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={styles.app}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div style={styles.mainContent}>
       

        <main style={styles.historyContainer}>
          <h1 style={styles.historyTitle}>Design History</h1>

          <div style={styles.historyList}>
            {ratings.length > 0 ? (
              ratings.map((rating) => (
                <div key={rating._id} style={styles.historyCard}>
                  {/* Clickable Image */}
                  {rating.outputImageUrl && (
                    <Link to={`/history/${rating._id}`} style={styles.imageLink}>
                      <img src={rating.outputImageUrl} alt="Room Design" style={styles.historyImage} />
                    </Link>
                  )}

                  {/* Content Section */}
                  <div style={styles.historyDetails}>
                    {/* <p><strong>Theme:</strong> {rating.theme}</p>
                    <p><strong>Room:</strong> {rating.room}</p>
                    <p><strong>Dimensions:</strong> {rating.dimensions}</p> */}
                    {/* <p><strong>Budget:</strong> ${rating.budget}</p> */}
                    <p>
                      {/* <strong>Color Palette:</strong>{" "} */}
                      {/* <span style={{ color: rating.colorPalette, fontWeight: "bold" }}>
                        {rating.colorPalette}
                      </span> */}
                    </p>
                    <p style={styles.rating}><strong>Rating:</strong> {rating.rating} ⭐</p>
                    <p style={styles.date}><strong>Date:</strong> {new Date(rating.date).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={styles.noDesigns}>No designs yet</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// Internal CSS Styles
const styles = {
  app: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    // backgroundColor: "#f8f9fa",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    background: "#ffffff",
    padding: "15px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  menuButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    marginRight: "10px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  historyContainer: {
    padding: "20px",
  },
  historyTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  historyCard: {
    background: "white",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    border: "1px solid #ddd",
    transition: "transform 0.2s ease-in-out",
  },
  historyCardHover: {
    transform: "scale(1.02)",
  },
  imageLink: {
    width: "100%",
  },
  historyImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  historyDetails: {
    padding: "15px",
  },
  rating: {
    color: "#ff9800",
    fontSize: "18px",
    fontWeight: "bold",
  },
  date: {
    color: "#555",
    fontSize: "14px",
  },
  noDesigns: {
    fontSize: "18px",
    color: "#888",
    textAlign: "center",
    marginTop: "20px",
  },
  "@media (min-width: 768px)": {
    historyCard: {
      flexDirection: "row",
    },
    historyImage: {
      width: "40%",
      height: "auto",
    },
    historyDetails: {
      width: "60%",
    },
  },
};

export default History;

