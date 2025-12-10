import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'; // Make sure axios is configured properly
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter'; // Import the new filter component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([1000, 1000000]); // default price range
  const [categories, setCategories] = useState(['Electronics', 'Books', 'Clothing', 'Food']);

  // Fetch products from backend and fall back to sample data if empty
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products');
        if (response.data && response.data.length > 0) {
          setProducts(response.data);  // Set the products from backend if available
        } else {
          setSampleProducts();  // Fall back to sample data if backend has no products
        }
      } catch (error) {
        console.error('Error fetching products', error);
        setSampleProducts();  // Use sample data if there is an error
      }
    };

    // Sample products for testing
    const setSampleProducts = () => {
      const sampleProducts = [];
      for (let i = 1; i <= 20; i++) {
        sampleProducts.push({
          _id: i,
          name: `Product ${i}`,
          description: `This is the description for product ${i}.`,
          price: (Math.random() * 100).toFixed(2),
          image: `https://placehold.co/300x200/png?text=Product+${i}`,
          category: `Category ${Math.ceil(i / 5)}`,
        });
      }
      setProducts(sampleProducts); // Set sample products to the state
    };

    fetchProducts();
  }, []);

  // Filter products based on category and price range
  useEffect(() => {
    const filtered = products.filter((product) => {
      const isCategoryMatch = category === 'All' || product.category === category;
      const isPriceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return isCategoryMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  }, [category, priceRange, products]);

  // Function to update the product in the list after deletion from the backend
  const deleteProduct = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`);
      if (response.status === 200) {
        // Re-fetch the products to reflect changes from backend
        const updatedProducts = await axiosInstance.get('/api/products');
        setProducts(updatedProducts.data);
        toast.success('Product deleted successfully!');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="container mt-5">
      {/* Product filter component */}
      <ProductFilter
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        categories={categories}
      />
      
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <ProductCard product={product} deleteProduct={deleteProduct} />
            </div>
          ))
        ) : (
          <p>No products available</p> // In case no products are available
        )}
      </div>
    </div>
  );
};

export default ProductList;
