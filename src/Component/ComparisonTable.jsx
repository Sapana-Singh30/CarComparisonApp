import React from "react";
import "../styles.css";

const ComparisonTable = ({ selectedCars }) => {
  return (
    <div className="comparison-table">
      <h2>Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {selectedCars.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>${car.price}</td>
              <td>{car.weight}</td>
              <td>{car.rating} ⭐</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
