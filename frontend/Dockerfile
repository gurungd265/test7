# Step 1: Use Node.js 18+ base image
FROM node:18 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the files
COPY . .

# Optional: Clear old modules and reinstall cleanly (prevents binding errors)
RUN rm -rf node_modules && npm install

# Step 5: Build the Vite app
RUN npm run build

# Step 6: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
