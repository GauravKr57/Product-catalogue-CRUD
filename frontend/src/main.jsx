import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Import the toast styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />  {/* Add the ToastContainer here */}
  </StrictMode>
);
