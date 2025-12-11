# frontend/Dockerfile
# Use official Node.js image as base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies for the frontend
COPY frontend/package.json frontend/package-lock.json /app/
RUN npm install

# Copy the rest of the frontend files to the container
COPY frontend /app/

# Build the React app for production
RUN npm run build

# Expose the port Vite will run on
EXPOSE 5173

# Command to run the app in production mode
CMD ["npm", "run", "preview"]
