import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios'; // Axios instance
import { useParams, useNavigate } from 'react-router-dom';  // Get product ID and navigate after update
import { toast } from 'react-toastify';  // For showing toast notifications

const EditProduct = () => {
  const { id } = useParams();  // Get product ID from URL
  const navigate = useNavigate();  // For navigation after update
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch the product data based on ID
  useEffect(() => {
    console.log('Product ID:', id);
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${id}`);
        console.log('Fetched product:', response.data); // Add logging
        if (response.data) {
          setProduct(response.data); // Set the product data
        } else {
          toast.error('Product not found'); // Handle case if product is not found
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error('Failed to fetch product details');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    
    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a JSON object from the updated product data
      const updatedProduct = {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price), // Ensure price is a number
        category: product.category
      };

      console.log('Sending data to backend:', updatedProduct);  // Log the data being sent

      // Send a PUT request to update the product details with JSON data
      const response = await axiosInstance.put(`/api/products/${id}`, updatedProduct, {
        headers: {
          'Content-Type': 'application/json',  // Ensure content type is application/json
        },
      });

      toast.success('Product updated successfully!');
      navigate(`/product/${id}`);  // Redirect to product detail page after update
    } catch (error) {
      console.error('Error updating product', error);
      toast.error('Failed to update product');
    }
  };

  // If the data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            value={product.name || ''} // Ensure the value is never undefined
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={product.description || ''} // Ensure the value is never undefined
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price"
            value={product.price || ''} // Ensure the value is never undefined
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            value={product.category || ''} // Ensure the value is never undefined
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-warning">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
