# Use the official Node.js 14 image as base for development
FROM node:18.20-slim AS development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

ENV NEXT_PUBLIC_NODE_URL yourNodeUrl

# Copy rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the Next.js development server with hot reloading
CMD ["npm", "run", "dev"]
