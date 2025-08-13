# 🚀 Deployment Guide

This guide covers various deployment options for the Admin Dashboard application.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 16+ (for local development)
- MongoDB 5+ (for local development)
- Git

## 🐳 Docker Deployment (Recommended)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd admin-dashboard
```

2. **Set up environment variables**
```bash
# Copy environment files
cp server/env.example server/.env
cp client/.env.example client/.env

# Edit the environment files with your configuration
nano server/.env
nano client/.env
```

3. **Build and run with Docker Compose**
```bash
# Build and start all services
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Deployment

1. **Set up production environment**
```bash
# Create production environment file
cp server/env.example server/.env.production

# Edit production settings
nano server/.env.production
```

2. **Deploy with production settings**
```bash
# Build and run in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

3. **Set up SSL with Let's Encrypt**
```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates to nginx directory
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./nginx/ssl/
```

## ☁️ Cloud Deployment

### AWS Deployment

#### Option 1: AWS ECS with Fargate

1. **Create ECS Cluster**
```bash
aws ecs create-cluster --cluster-name admin-dashboard
```

2. **Create ECR repositories**
```bash
aws ecr create-repository --repository-name admin-dashboard-backend
aws ecr create-repository --repository-name admin-dashboard-frontend
```

3. **Build and push images**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and tag images
docker build -t admin-dashboard-backend ./server
docker build -t admin-dashboard-frontend ./client

# Tag for ECR
docker tag admin-dashboard-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/admin-dashboard-backend:latest
docker tag admin-dashboard-frontend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/admin-dashboard-frontend:latest

# Push to ECR
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/admin-dashboard-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/admin-dashboard-frontend:latest
```

4. **Deploy with CloudFormation**
```bash
aws cloudformation create-stack \
  --stack-name admin-dashboard \
  --template-body file://aws/cloudformation.yml \
  --parameters ParameterKey=DomainName,ParameterValue=yourdomain.com
```

#### Option 2: AWS EC2 with Docker

1. **Launch EC2 instance**
```bash
aws ec2 run-instances \
  --image-id ami-0c02fb55956c7d316 \
  --count 1 \
  --instance-type t3.medium \
  --key-name your-key-pair \
  --security-group-ids sg-xxxxxxxxx
```

2. **SSH into instance and install Docker**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip

# Install Docker
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Add user to docker group
sudo usermod -aG docker ubuntu
```

3. **Deploy application**
```bash
# Clone repository
git clone <repository-url>
cd admin-dashboard

# Set up environment
cp server/env.example server/.env
nano server/.env

# Deploy
docker-compose up --build -d
```

### Google Cloud Platform (GCP)

#### Option 1: Google Kubernetes Engine (GKE)

1. **Create GKE cluster**
```bash
gcloud container clusters create admin-dashboard \
  --zone us-central1-a \
  --num-nodes 3 \
  --machine-type e2-medium
```

2. **Build and push to Google Container Registry**
```bash
# Configure Docker for GCR
gcloud auth configure-docker

# Build and push images
docker build -t gcr.io/your-project/admin-dashboard-backend ./server
docker build -t gcr.io/your-project/admin-dashboard-frontend ./client

docker push gcr.io/your-project/admin-dashboard-backend
docker push gcr.io/your-project/admin-dashboard-frontend
```

3. **Deploy to GKE**
```bash
kubectl apply -f k8s/
```

#### Option 2: Google Compute Engine

1. **Create VM instance**
```bash
gcloud compute instances create admin-dashboard \
  --zone us-central1-a \
  --machine-type e2-medium \
  --image-family ubuntu-2004-lts \
  --image-project ubuntu-os-cloud
```

2. **Deploy application**
```bash
# SSH into instance
gcloud compute ssh admin-dashboard --zone us-central1-a

# Install Docker and deploy
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo usermod -aG docker $USER

# Clone and deploy
git clone <repository-url>
cd admin-dashboard
docker-compose up --build -d
```

### Microsoft Azure

#### Option 1: Azure Container Instances (ACI)

1. **Create Azure Container Registry**
```bash
az acr create --name adminDashboardRegistry --resource-group your-rg --sku Basic
```

2. **Build and push images**
```bash
# Login to ACR
az acr login --name adminDashboardRegistry

# Build and push
docker build -t adminDashboardRegistry.azurecr.io/admin-dashboard-backend ./server
docker build -t adminDashboardRegistry.azurecr.io/admin-dashboard-frontend ./client

docker push adminDashboardRegistry.azurecr.io/admin-dashboard-backend
docker push adminDashboardRegistry.azurecr.io/admin-dashboard-frontend
```

3. **Deploy to ACI**
```bash
az container create \
  --resource-group your-rg \
  --name admin-dashboard-backend \
  --image adminDashboardRegistry.azurecr.io/admin-dashboard-backend \
  --ports 5000 \
  --environment-variables MONGODB_URI=your-mongodb-uri
```

#### Option 2: Azure Kubernetes Service (AKS)

1. **Create AKS cluster**
```bash
az aks create \
  --resource-group your-rg \
  --name admin-dashboard-aks \
  --node-count 3 \
  --enable-addons monitoring
```

2. **Deploy to AKS**
```bash
az aks get-credentials --resource-group your-rg --name admin-dashboard-aks
kubectl apply -f k8s/
```

## 🚀 Platform-as-a-Service (PaaS)

### Heroku

1. **Create Heroku app**
```bash
heroku create admin-dashboard-app
```

2. **Add MongoDB addon**
```bash
heroku addons:create mongolab:sandbox
```

3. **Deploy backend**
```bash
cd server
heroku git:remote -a admin-dashboard-app
git add .
git commit -m "Deploy backend"
git push heroku main
```

4. **Deploy frontend to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod
```

### Vercel + MongoDB Atlas

1. **Set up MongoDB Atlas**
```bash
# Create cluster in MongoDB Atlas
# Get connection string
```

2. **Deploy backend to Vercel**
```bash
cd server
vercel --prod
```

3. **Deploy frontend to Vercel**
```bash
cd client
vercel --prod
```

### Railway

1. **Connect GitHub repository**
```bash
# Connect your GitHub repo to Railway
# Railway will auto-deploy on push
```

2. **Set environment variables**
```bash
# Set in Railway dashboard:
# MONGODB_URI
# JWT_SECRET
# EMAIL_* variables
```

## 🔧 Environment Configuration

### Required Environment Variables

#### Backend (.env)
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@admin-dashboard.com
FRONTEND_URL=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-key
LOG_LEVEL=info
```

#### Frontend (.env)
```bash
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
VITE_APP_NAME=Admin Dashboard
```

## 🔒 Security Considerations

### SSL/TLS Configuration

1. **Obtain SSL certificate**
```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com
```

2. **Configure Nginx**
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
}
```

### Security Headers

Add security headers to your Nginx configuration:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 📊 Monitoring and Logging

### Application Monitoring

1. **Set up PM2 monitoring**
```bash
npm install -g pm2
pm2 start server.js --name admin-dashboard
pm2 monit
```

2. **Configure logging**
```bash
# Log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

### Database Monitoring

1. **MongoDB Atlas monitoring**
- Enable monitoring in MongoDB Atlas dashboard
- Set up alerts for performance metrics

2. **Custom monitoring**
```bash
# Health check endpoint
curl https://api.yourdomain.com/health
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.4
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /opt/admin-dashboard
            git pull origin main
            docker-compose down
            docker-compose up --build -d
```

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**
```bash
# Check what's using the port
sudo netstat -tulpn | grep :5000
sudo lsof -i :5000
```

2. **Database connection issues**
```bash
# Test MongoDB connection
mongo mongodb://localhost:27017/admin-dashboard
```

3. **Docker issues**
```bash
# Clean up Docker
docker system prune -a
docker volume prune
```

### Logs and Debugging

1. **View application logs**
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# PM2 logs
pm2 logs admin-dashboard
```

2. **Debug mode**
```bash
# Run in debug mode
NODE_ENV=development DEBUG=* npm run dev
```

## 📈 Performance Optimization

### Production Optimizations

1. **Enable compression**
```javascript
app.use(compression());
```

2. **Cache static assets**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

3. **Database indexing**
```javascript
// Add indexes for frequently queried fields
db.users.createIndex({ email: 1 });
db.projects.createIndex({ status: 1, createdAt: -1 });
```

## 🔄 Backup and Recovery

### Database Backup

1. **Automated MongoDB backup**
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/admin-dashboard" --out="/backup/$DATE"
```

2. **Schedule backup with cron**
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```

### Application Backup

1. **Backup uploads directory**
```bash
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

2. **Backup configuration**
```bash
cp server/.env server/.env.backup
cp client/.env client/.env.backup
```

This deployment guide covers the most common deployment scenarios. Choose the option that best fits your infrastructure and requirements.
