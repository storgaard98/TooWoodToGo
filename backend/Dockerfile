# Use the official Node.js 14 image as base for development
FROM node:18.20-slim AS development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install nodemon

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 9000

# Start the Node.js application with nodemon for auto-reloading
CMD ["node node.js" ]
