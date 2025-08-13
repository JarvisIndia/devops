# 🚀 Modern Admin Dashboard

A fully functional, responsive web-based admin dashboard built with React, Node.js, Express, and MongoDB. Features include user authentication, role-based access control, real-time data visualization, and comprehensive CRUD operations.

## ✨ Features

### 🔐 Authentication & Security
- User authentication (login, register, password reset)
- Role-based access control (admin, manager, user)
- JWT token-based authentication
- Input validation & sanitization
- Rate limiting and brute-force protection

### 📊 Dashboard & Analytics
- Interactive charts (bar, line, pie) using Chart.js
- Real-time data updates via WebSocket
- Dynamic dashboard widgets
- Export functionality (CSV, PDF)
- Dark mode toggle with persistence

### 👥 User Management
- Complete CRUD operations for users
- Role assignment and management
- User activity tracking
- Profile management

### 📝 Project & Task Management
- Project creation and assignment
- Task tracking with deadlines
- Status management
- Team collaboration

### 📦 Inventory Management
- Product catalog with stock tracking
- Search and filter functionality
- Stock alerts and notifications
- Inventory reports

### 🛠 Advanced Features
- Multi-language support
- Notifications center
- System logs and audit trail
- API key management
- Customizable dashboard layout
- Scheduled email reports

## 🏗 Project Structure

```
admin-dashboard/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles
├── server/                 # Node.js backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── docker/                # Docker configuration
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd admin-dashboard
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Environment Setup**
```bash
# Backend environment variables
cd server
cp .env.example .env
# Edit .env with your configuration

# Frontend environment variables
cd ../client
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the application**
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)
npm start
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🌐 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017/admin-dashboard

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Dashboard Data
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/charts` - Get chart data
- `GET /api/dashboard/notifications` - Get notifications

## 🛡 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation with Joi
- Rate limiting with express-rate-limit
- CORS protection
- Helmet.js for security headers

## 🎨 UI/UX Features

- Responsive design with Material-UI
- Dark/Light theme toggle
- Interactive charts with Chart.js
- Real-time notifications
- Drag & drop functionality
- Multi-language support

## 📊 Technologies Used

### Frontend
- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **Chart.js** - Data visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.io-client** - Real-time communication
- **React Hook Form** - Form handling
- **React Query** - Data fetching

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Socket.io** - Real-time communication
- **Nodemailer** - Email service
- **Multer** - File uploads

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PM2** - Process manager

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@admin-dashboard.com or create an issue in the repository.
