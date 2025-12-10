# 🛍️ Product Catalog Application

## Overview

This project is a **full-stack Product Catalog application** designed to allow users to view, add, edit, and delete products. It utilizes **React** for the user-friendly frontend interface and **Flask** for the robust backend API, with **MongoDB** serving as the database for product and user data.

### Key Features
* **Product Catalog:** Display a list of all products fetched from the backend.
* **Authentication:** Secure Login and Signup functionality for user management.
* **Product Management (CRUD):** Functionality to **C**reate, **R**ead, **U**pdate, and **D**elete products.
* **Filters:** Apply category and price range filters to quickly find products.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

* **Node.js & npm** (for the frontend)
* **Python 3.x & pip** (for the backend)
* **MongoDB** (for the database)

## 🚀 Getting Started

Follow these steps to get your local development environment up and running.

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
# git clone [https://github.com/yourusername/product-catalog.git](https://github.com/yourusername/product-catalog.git)
cd product-catalog
```


### Set up the Backend (Flask + MongoDB)
#### Step 1: Navigate to the backend directory
```bash
cd backend
```

#### Step 2: Set up a virtual environment

If you don't have a virtual environment set up, create one by running:

```bash
python3 -m venv venv
```

Activate the virtual environment:

On Windows:

```bash
venv\Scripts\activate
```


On Mac/Linux:
```bash
source venv/bin/activate
```

#### Step 3: Install dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

#### Step 4: Set up MongoDB

Ensure MongoDB is running on your local machine. If not, you can download and run MongoDB from here
.

By default, it should run on mongodb://localhost:27017.

#### Step 5: Run the Backend

Start the Flask server:

```bash
python app.py
```


## The backend API will be accessible at http://127.0.0.1:5000/.

# 3. Set up the Frontend (React)
#### Step 1: Navigate to the frontend directory

```bash
cd frontend
```

#### Step 2: Install dependencies

Install the required JavaScript packages:

```bash
npm install
```

#### Step 3: Run the Frontend

Start the React development server:
```bash
npm start
```


## The frontend application will be accessible at http://localhost:5173/.

## 🛠️ Using the Application

Once both the frontend and backend servers are running, navigate to `http://localhost:5173/` in your browser.

### Features:

* **Login & SignUp:** You can log in or sign up to start managing the product catalog.
* **Product List:** View the list of products.
* **Product Management:**
    * Add new products.
    * Edit or delete existing products.
    * Apply category and price range filters.

## 🌐 Example API Endpoints

The application utilizes a standard RESTful approach for product management (CRUD). 

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products. |
| `POST` | `/api/products` | Add a new product. |
| `PUT` | `/api/products/:id` | Edit an existing product. |
| `DELETE` | `/api/products/:id` | Delete a product. |

## 📁 File Structure

The project is divided into the following main parts:

### Frontend (`frontend/`)

* `components/`: Contains React components such as Navbar, ProductCard, ProductList, ProductFilter, etc.
* `context/`: Contains the `AuthContext` for managing user authentication.
* `App.jsx`: The main file that manages routes and components.
* `public/`: Contains the public files for the React app.
* `src/`: Contains all the source code and components.

### Backend (`backend/`)

* `app.py`: The main entry point for the Flask server.
* `product_routes.py`: Contains API routes for product-related functionality.
* `product_controller.py`: Contains controller logic for handling product data.
* `models/`: Contains the model logic for interacting with MongoDB.

---

## 📝 Notes

* **Authentication:** The login and sign-up pages allow users to authenticate themselves. Upon successful login, users will be able to manage products.
* **MongoDB:** Data is stored in a MongoDB database with a `products` collection.
* **Filters:** The product list can be filtered by category and price range.

## ❗ Troubleshooting

### Common Issues

| Issue | Solution |
| :--- | :--- |
| **MongoDB Connection Issues** | Ensure MongoDB is installed and running. If MongoDB is running on a non-default port, update the connection string in the backend code. |
| **CORS Issues** | If you face CORS issues, ensure that the backend is properly configured to allow requests from the frontend (e.g., use the `flask-cors` package). |
| **Frontend Not Loading** | Ensure all dependencies are installed correctly using `npm install`. Ensure that React is running on the correct port (`http://localhost:5173/`). |