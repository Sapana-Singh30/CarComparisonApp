import React, { useState } from "react";
import cars from "../Data/cars";
import CarCard from "./CarCard";
import ComparisonTable from "./ComparisonTable";
import ".././styles.css"

const MainComponent = () =>{
    
        const [selectedCars, setSelectedCars] = useState([]);
        const [search, setSearch] = useState("");
        const [sortBy, setSortBy] = useState("");
        const [priceRange, setPriceRange] = useState([0, 100000]); // Min-Max price range
        const [selectedBrand, setSelectedBrand] = useState("");
        const [selectedType, setSelectedType] = useState("");
      
        // Get unique brands and car types
        const uniqueBrands = [...new Set(cars.map((car) => car.brand))];
        const uniqueTypes = [...new Set(cars.map((car) => car.type).filter(Boolean))];

      
        // Toggle car selection
        const toggleCarSelection = (car) => {
          setSelectedCars((prev) =>
            prev.find((c) => c.id === car.id) ? prev.filter((c) => c.id !== car.id) : [...prev, car]
          );
        };
      
        // Sorting logic
        const sortedCars = [...cars].sort((a, b) => {
          if (sortBy === "priceAsc") return a.price - b.price;
          if (sortBy === "priceDesc") return b.price - a.price;
          if (sortBy === "ratingAsc") return a.rating - b.rating;
          if (sortBy === "ratingDesc") return b.rating - a.rating;
          return 0;
        });
      
        // Filtered cars based on search, price range, brand, and type
        const filteredCars = sortedCars.filter(
          (car) =>
            car.brand.toLowerCase().includes(search.toLowerCase()) &&
            car.price >= priceRange[0] &&
            car.price <= priceRange[1] &&
            (selectedBrand ? car.brand === selectedBrand : true) &&
            (selectedType ? car.type === selectedType : true)
        );
      
        return (
          <div className="container">
            <h1>Car Comparison Dashboard</h1>
      
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by brand or model..."
              className="search-bar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
      
            {/* Filters */}
            <div className="filters">
              {/* Price Range */}
              <label>Price Range:</label>
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
              <span>${priceRange[0]} - ${priceRange[1]}</span>
      
          {/* Brand Filter */}
<label>Brand:</label>
<select className="filter-dropdown" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
  <option value="">All</option>
  {uniqueBrands.length > 0 ? (
    uniqueBrands.map((brand) => <option key={brand} value={brand}>{brand}</option>)
  ) : (
    <option disabled>No data available</option>
  )}
</select>

{/* Car Type Filter */}
<label>Car Type:</label>
<select className="filter-dropdown" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
  <option value="">All</option>
  {uniqueTypes.length > 0 ? (
    uniqueTypes.map((type) => <option key={type} value={type}>{type}</option>)
  ) : (
    <option disabled>No data available</option>
  )}
</select>

      
              {/* Sorting Dropdown */}
              <label>Sort By:</label>
              <select className="filter-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">None</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="ratingAsc">Rating: Low to High</option>
                <option value="ratingDesc">Rating: High to Low</option>
              </select>
            </div>
      
            {/* Car List */}
            <div className="car-grid">
  {filteredCars.length > 0 ? (
    filteredCars.map((car) => (
      <CarCard
        key={car.id}
        car={car}
        toggleCarSelection={toggleCarSelection}
        isSelected={selectedCars.includes(car)}
      />
    ))
  ) : (
    <p className="no-data">No cars found based on your filters.</p>
  )}
</div>
      
            {/* Comparison Table */}
            {selectedCars.length > 0 && <ComparisonTable selectedCars={selectedCars} />}
          </div>
        );
      }
      
      export default MainComponent;