# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all source code except public folder
COPY . .

# Copy environment file
COPY .env.production .env

# Ensure public directory exists and copy public files
RUN mkdir -p /app/public
COPY public/* /app/public/

# Build Vite app
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 internally
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
