# Use a Node.js version that is compatible with Angular CLI
FROM node:latest as node

# Set the working directory to the Angular app's directory
WORKDIR /app

COPY ENSA-Gestion/ /app

RUN npm install

RUN npm run build --prod



from nginx:alpine
COPY --from=node /app/dist/ENSA-Gestion /usr/share/nginx/html
