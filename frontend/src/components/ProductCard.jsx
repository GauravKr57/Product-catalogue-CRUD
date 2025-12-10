import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';


const ProductCard = ({ product, deleteProduct }) => {
  const { user } = useAuth();
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`);
      if (response.status === 200) {
        toast.success('Product deleted successfully!');
        // Optimistically update state
        deleteProduct(id);  // This should immediately remove the product from the state
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product', error);
      toast.error('Failed to delete product');
    }
  };
  

  return (
    <div className="card">
      <img src={product.image || 'https://via.placeholder.com/150'} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <Link to={`/product/${product._id}`} className="btn btn-primary">View Details</Link>
        
        {/* Conditionally render Edit and Delete buttons based on login state */}
        {user && (
          <>
            <Link to={`/edit-product/${product._id}`} className="btn btn-warning ms-2">Edit</Link>
            <button onClick={() => handleDelete(product._id)} className="btn btn-danger ms-2">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
