# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Build Vite app
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config from project root
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80 internally
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
