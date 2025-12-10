import React, { useState } from 'react';
import axiosInstance from '../axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a FormData object
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('price', parseFloat(product.price)); // Ensure price is a number
            formData.append('category', product.category);

            console.log('Sending data to backend:', product);  // Log the product data being sent

            // Send the form data to the backend
            const response = await axiosInstance.post('/api/products', formData);
            toast.success('Product added successfully!');
            navigate('/'); // Redirect to the home page after successful add
        } catch (error) {
            console.error('Error adding product', error);
            toast.error('Failed to add product');
        }
    };


    return (
        <div className="container mt-5">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        placeholder="Category"
                        value={product.category}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
