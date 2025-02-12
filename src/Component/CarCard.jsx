import React from "react";
import "../styles.css";

const CarCard = ({ car, toggleCarSelection, isSelected }) => {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.model} />
      <h2>{car.brand} {car.model}</h2>
      <p>Price: ${car.price}</p>
      <p>Weight: {car.weight}</p>
      <p>Rating: {car.rating} ⭐</p>
      <button
        className={`compare-btn ${isSelected ? "remove" : "add"}`}
        onClick={() => toggleCarSelection(car)}
      >
        {isSelected ? "Remove" : "Compare"}
      </button>
    </div>
  );
};

export default CarCard;
