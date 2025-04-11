// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const HistoryDetails = () => {
//   const { id } = useParams();
//   const [details, setDetails] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/ratings/${id}`)
//       .then((response) => response.json())
//       .then((data) => setDetails(data))
//       .catch((error) => console.error("Error fetching details:", error));
//   }, [id]);

//   if (!details) {
//     return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>;
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Design Details</h1>
//       <img src={details.outputImageUrl} alt="Room Design" style={styles.image} />
//       <p><strong>Theme:</strong> {details.theme}</p>
//       <p><strong>Room:</strong> {details.room}</p>
//       <p><strong>Dimensions:</strong> {details.dimensions}</p>
//       <p><strong>Budget:</strong> ${details.budget}</p>
//       <p><strong>Color Palette:</strong> {details.colorPalette}</p>
//       <p><strong>Rating:</strong> {details.rating} ⭐</p>
//       <p><strong>Date:</strong> {new Date(details.date).toLocaleString()}</p>
//     </div>
//   );
// };

// const styles = {
//   container: { maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" },
//   title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
//   image: { width: "100%", borderRadius: "8px", marginBottom: "15px" },
// };

// export default HistoryDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HistoryDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/ratings/${id}`)
      .then((response) => response.json())
      .then((data) => setDetails(data))
      .catch((error) => console.error("Error fetching details:", error));
      
  }, [id]);

  if (!details) {
    return <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Design Details</h1>
      {/* <h1>Input<h1> */}
      <img src={details.inputImageUrl} alt="Room Design" style={styles.image} />
    {/* <h1>Output<h1> */}
      <img src={details.outputImageUrl} style={styles.image}/>
      

      <p><strong>Theme:</strong> {details.theme}</p>
      <p><strong>Room:</strong> {details.room}</p>
      <p><strong>Dimensions:</strong> {details.dimensions}</p>
      <p><strong>Budget:</strong> ${details.budget}</p>
      <p><strong>Color Palette:</strong> {details.colorPalette}</p>
      <p><strong>Rating:</strong> {details.rating} ⭐</p>
      <p><strong>Date:</strong> {new Date(details.date).toLocaleString()}</p>
    </div>
  );
};

const styles = {
  container: { maxWidth: "600px", margin: "auto", padding: "20px", textAlign: "center" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  image: { width: "100%", borderRadius: "8px", marginBottom: "15px" },
};

export default HistoryDetails;