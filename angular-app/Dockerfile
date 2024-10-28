# Use the official Node.js image as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN ng build --prod

# Use Nginx to serve the app
FROM nginx:alpine

# Copy built files from the build stage to Nginx's HTML directory
COPY --from=build /app/dist/ensa-gestion /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
