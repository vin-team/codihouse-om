# Use an official Node.js runtime as a parent image
FROM node:22

RUN mkdir -p /app
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Start the Next.js app
CMD ["npm", "start"]
