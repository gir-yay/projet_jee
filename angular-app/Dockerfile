# Use a Node.js version that is compatible with Angular CLI
FROM node:20

# Set the working directory to the Angular app's directory
WORKDIR /app

# Copy the package.json and package-lock.json from ensa-gestion to the working directory
COPY ENSA-Gestion/package.json ENSA-Gestion/package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install the application dependencies
RUN npm install

# Copy the rest of your application files from ensa-gestion
COPY ENSA-Gestion/ .

# Build the Angular application
RUN ng build --prod

# Install a lightweight server to serve the static files
RUN npm install -g http-server

# Expose the port your app runs on
EXPOSE 4200

# Start the application using the lightweight server
CMD ["http-server", "dist/ENSA-Gestion", "-p", "4200", "--host", "0.0.0.0"]
