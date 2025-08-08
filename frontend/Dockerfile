# Step 1: Use a Node.js base image
FROM node:16 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the files
COPY . .

# Step 5: Build the app for production
RUN npm run build

# Step 6: Serve the app using a simple HTTP server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
