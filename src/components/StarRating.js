import { useState } from "react";

const StarRating = ({ count }) => {
  const [rating, setRating] = useState(0);
  const stars = [];

  const assignRating = (index) => {
    if (rating === 1 && index === 0) {
      setRating(0);
    } else {
      setRating(index + 1);
    }
  };
  console.log(rating);

  for (let i = 0; i < count; i++) {
    stars.push(
      <div
        key={i}
        onClick={() => assignRating(i)}
        className={`five-pointed-star mr-1 cursor-pointer ${
          i < rating
            ? "border-b-green-600 before:border-b-green-600 after:border-b-green-600"
            : ""
        }`}
      ></div>
    );
  }
  const selectedStyle =
    "border-b-green-600 before:border-b-green-600 after:border-b-green-600";
  return (
    <div className="rating-container">
      <p>Rate our services</p>
      <br />
      <div className="star-row flex">
        {stars.map((star) => {
          return star;
        })}
      </div>
    </div>
  );
};

export default StarRating;
