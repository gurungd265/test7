# Step 1: Build React app using Node
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: remove default nginx conf and replace it (especially for React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf
