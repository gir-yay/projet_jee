# Use a Node.js version that is compatible with Angular CLI
FROM node:latest

RUN mkdir /app
# Set the working directory to the Angular app's directory
WORKDIR /app

COPY ENSA-Gestion/* /app

RUN npm install

RUN npm install -g @angular/cli
RUN yarn  install

CMD ["ng", "serve", "--host", "0.0.0.0", ]




