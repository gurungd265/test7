# Step 1: Use the official Node.js image to build the app
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Vite project (production build)
RUN npm run build

# Step 7: Use an Nginx image to serve the built app
FROM nginx:alpine

# Step 8: Copy the Vite build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 for Nginx
EXPOSE 80

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
