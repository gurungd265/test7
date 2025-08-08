# Use Node.js LTS with Alpine (lightweight and compatible)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (including SWC native bindings)
RUN npm install --force

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
