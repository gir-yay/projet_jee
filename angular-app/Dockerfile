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

# Expose the port your app runs on
EXPOSE 4200

# Start the Angular application with live reload
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
