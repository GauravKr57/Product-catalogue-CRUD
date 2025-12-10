import React from 'react';

const ProductFilter = ({ category, setCategory, priceRange, setPriceRange, categories }) => {
  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    setPriceRange([parseInt(e.target.value), priceRange[1]]);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-8">
          <label className="form-label">Price Range</label>
          <input
            type="range"
            className="form-range"
            min="1000"
            max="100000"
            step="1000"
            value={priceRange[0]}
            onChange={handlePriceChange}
          />
          <div className="d-flex justify-content-between">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
