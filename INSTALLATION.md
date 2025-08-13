# 🚀 Installation Guide

This guide will help you set up and run the Admin Dashboard project.

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- MongoDB (for backend)
- Git

## 🛠 Quick Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd admin-dashboard
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### 3. Environment Setup

#### Backend Environment
```bash
cd server
cp env.example .env
```

Edit `server/.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/admin-dashboard
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment
```bash
cd client
cp env.example .env
```

Edit `client/.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
VITE_APP_NAME=Admin Dashboard
```

### 4. Start Development Servers

#### Backend (Terminal 1)
```bash
cd server
npm run dev
```

#### Frontend (Terminal 2)
```bash
cd client
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Build and start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## 🔧 Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server
npm run start    # Start production server
npm run test     # Run tests
npm run lint     # Run ESLint
npm run seed     # Seed database with sample data
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🗄 Database Setup

### MongoDB (Local)
1. Install MongoDB
2. Start MongoDB service
3. Create database: `admin-dashboard`

### MongoDB Atlas (Cloud)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## 🔐 Default Admin User

After running the seed script, you can login with:
- **Email**: admin@example.com
- **Password**: admin123

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity

3. **Dependencies installation failed**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript errors**
   ```bash
   # Run type check
   npm run type-check
   
   # Fix linting issues
   npm run lint:fix
   ```

## 📚 Next Steps

1. **Customize Configuration**: Update environment variables
2. **Add Features**: Extend the dashboard with new modules
3. **Styling**: Customize theme and components
4. **Deployment**: Follow the deployment guide in `DEPLOYMENT.md`

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the logs in the terminal
3. Check the browser console for frontend errors
4. Create an issue in the repository

Happy coding! 🎉
