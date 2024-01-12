# Use the official Node.js image
FROM node

# Set the working directory
WORKDIR /src/user/api

# Copy only the package.json and package-lock.json files first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install serve globally and build the application
RUN npm install -g serve && npm run build

# Expose the port your app runs on
EXPOSE 3000

# Run the application using serve
CMD ["serve", "dist"]
