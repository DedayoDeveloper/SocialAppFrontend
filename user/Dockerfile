# Use an official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json ./
COPY package-lock.json ./

# Install the app dependencies
RUN npm install

# Copy the entire React app to the working directory
COPY . .

# Build the React app
RUN npm run build

# Serve the React app using a simple static file server
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]
