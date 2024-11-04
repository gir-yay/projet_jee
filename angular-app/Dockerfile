# Use a Node.js version that is compatible with Angular CLI
FROM node:latest

RUN mkdir /app
WORKDIR /app

# Copy all project files into the container
COPY ENSA-Gestion/ /app

# Install dependencies
RUN npm install

# Install Angular CLI globally if necessary
RUN npm install -g @angular/cli

# Start the application using the local Angular CLI path
CMD ["node_modules/.bin/ng", "serve", "--host", "0.0.0.0"]
