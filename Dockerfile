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

ARG NEXT_PUBLIC_baseApiURL
ARG NEXT_PUBLIC_storageAccessTokenKey
ARG NEXT_PUBLIC_storageRefreshTokenKey
ARG NEXT_PUBLIC_storageIsRefreshingTokenKey
ARG NEXT_PUBLIC_storageDeviceIdKey
ARG NEXT_PUBLIC_storageUserKey
ARG NEXT_PUBLIC_storageRoleKey

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
