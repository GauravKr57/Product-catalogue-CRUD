# backend/Dockerfile
# Use official Python image as base image
FROM python:3.9-alpine

# Set working directory in the container
WORKDIR /app

# Install system dependencies (important for MongoDB or any additional packages)
RUN apk add --no-cache gcc musl-dev libffi-dev

# Install Python dependencies from requirements.txt
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend files to the container
COPY backend /app/

# Expose the port Flask will run on
EXPOSE 5000

# Set environment variables for MongoDB URI (for accessing from Docker containers)
ENV MONGO_URI=mongodb://host.docker.internal:20107/ecommerce  # MongoDB URI to local MongoDB

# Command to run the Flask app
CMD ["python", "app.py"]
