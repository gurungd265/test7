# Stage 1: Build
FROM node:22 as builder

WORKDIR /app

# Only copy package.json and lock file first
COPY package*.json ./

# Install with clean environment
RUN npm ci --omit=optional

# Now copy the rest of the code
COPY . .

# Build Vite
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
