import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          onClick={() => handleClick(index)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;