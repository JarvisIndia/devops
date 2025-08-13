# 📁 Project Structure

This document provides a comprehensive overview of the Admin Dashboard project structure, explaining the purpose and organization of each component.

## 🏗 Overall Architecture

```
admin-dashboard/
├── 📁 client/                 # React Frontend Application
├── 📁 server/                 # Node.js Backend API
├── 📁 docker/                 # Docker Configuration Files
├── 📁 docs/                   # Documentation
├── 📁 nginx/                  # Nginx Configuration
├── 📁 scripts/                # Utility Scripts
├── 📄 docker-compose.yml      # Multi-container Orchestration
├── 📄 README.md               # Project Overview
├── 📄 DEPLOYMENT.md           # Deployment Guide
└── 📄 PROJECT_STRUCTURE.md    # This File
```

## 🎨 Frontend (client/)

### Core Structure
```
client/
├── 📁 public/                 # Static Assets
│   ├── 📄 index.html         # Main HTML Template
│   ├── 📄 favicon.ico        # Favicon
│   └── 📁 assets/            # Static Images, Icons
├── 📁 src/                   # Source Code
│   ├── 📁 components/        # Reusable UI Components
│   ├── 📁 pages/            # Page Components
│   ├── 📁 hooks/            # Custom React Hooks
│   ├── 📁 context/          # React Context Providers
│   ├── 📁 services/         # API Services
│   ├── 📁 utils/            # Utility Functions
│   ├── 📁 types/            # TypeScript Type Definitions
│   ├── 📁 styles/           # Global Styles
│   ├── 📁 assets/           # Frontend Assets
│   ├── 📄 App.tsx           # Main App Component
│   ├── 📄 main.tsx          # Application Entry Point
│   └── 📄 vite-env.d.ts     # Vite Type Definitions
├── 📄 package.json           # Frontend Dependencies
├── 📄 vite.config.ts         # Vite Configuration
├── 📄 tsconfig.json          # TypeScript Configuration
├── 📄 .eslintrc.js           # ESLint Configuration
└── 📄 Dockerfile             # Frontend Docker Image
```

### Components Organization
```
src/components/
├── 📁 Auth/                  # Authentication Components
│   ├── 📄 LoginForm.tsx     # Login Form
│   ├── 📄 RegisterForm.tsx  # Registration Form
│   ├── 📄 ProtectedRoute.tsx # Route Protection
│   └── 📄 ForgotPassword.tsx # Password Reset
├── 📁 Layout/               # Layout Components
│   ├── 📄 Layout.tsx        # Main Layout
│   ├── 📄 Sidebar.tsx       # Navigation Sidebar
│   ├── 📄 Header.tsx        # Top Navigation
│   ├── 📄 SidebarItem.tsx   # Sidebar Menu Item
│   └── 📄 NotificationDrawer.tsx # Notifications Panel
├── 📁 Dashboard/            # Dashboard Components
│   ├── 📄 StatCard.tsx      # Statistics Card
│   ├── 📄 ChartCard.tsx     # Chart Container
│   ├── 📄 RecentActivity.tsx # Activity Feed
│   └── 📄 QuickActions.tsx  # Quick Action Buttons
├── 📁 Common/               # Shared Components
│   ├── 📄 LoadingSpinner.tsx # Loading Indicator
│   ├── 📄 ErrorBoundary.tsx # Error Handling
│   ├── 📄 Modal.tsx         # Modal Dialog
│   └── 📄 DataTable.tsx     # Data Table Component
├── 📁 Forms/                # Form Components
│   ├── 📄 UserForm.tsx      # User Management Form
│   ├── 📄 ProjectForm.tsx   # Project Form
│   └── 📄 ProductForm.tsx   # Product Form
└── 📁 Charts/               # Chart Components
    ├── 📄 LineChart.tsx     # Line Chart
    ├── 📄 BarChart.tsx      # Bar Chart
    └── 📄 PieChart.tsx      # Pie Chart
```

### Pages Organization
```
src/pages/
├── 📁 Auth/                 # Authentication Pages
│   ├── 📄 Login.tsx        # Login Page
│   ├── 📄 Register.tsx     # Registration Page
│   ├── 📄 ForgotPassword.tsx # Password Reset Page
│   ├── 📄 ResetPassword.tsx # Password Reset Form
│   └── 📄 VerifyEmail.tsx  # Email Verification
├── 📁 Dashboard/           # Dashboard Pages
│   ├── 📄 Dashboard.tsx    # Main Dashboard
│   └── 📄 Analytics.tsx    # Analytics Page
├── 📁 Users/              # User Management
│   ├── 📄 Users.tsx       # Users List
│   ├── 📄 UserDetail.tsx  # User Details
│   └── 📄 UserForm.tsx    # User Form
├── 📁 Projects/           # Project Management
│   ├── 📄 Projects.tsx    # Projects List
│   ├── 📄 ProjectDetail.tsx # Project Details
│   └── 📄 ProjectForm.tsx # Project Form
├── 📁 Inventory/          # Inventory Management
│   ├── 📄 Inventory.tsx   # Inventory List
│   ├── 📄 ProductDetail.tsx # Product Details
│   └── 📄 ProductForm.tsx # Product Form
├── 📁 Settings/           # Settings Pages
│   ├── 📄 Settings.tsx    # General Settings
│   ├── 📄 Profile.tsx     # User Profile
│   └── 📄 Security.tsx    # Security Settings
└── 📄 NotFound.tsx        # 404 Page
```

## 🔧 Backend (server/)

### Core Structure
```
server/
├── 📁 config/              # Configuration Files
│   ├── 📄 database.js      # Database Configuration
│   ├── 📄 email.js         # Email Configuration
│   └── 📄 redis.js         # Redis Configuration
├── 📁 controllers/         # Route Controllers
│   ├── 📄 authController.js # Authentication Logic
│   ├── 📄 userController.js # User Management
│   ├── 📄 projectController.js # Project Management
│   ├── 📄 inventoryController.js # Inventory Management
│   ├── 📄 dashboardController.js # Dashboard Data
│   └── 📄 notificationController.js # Notifications
├── 📁 middleware/          # Custom Middleware
│   ├── 📄 auth.js          # Authentication Middleware
│   ├── 📄 validation.js    # Input Validation
│   ├── 📄 rateLimit.js     # Rate Limiting
│   ├── 📄 errorHandler.js  # Error Handling
│   └── 📄 upload.js        # File Upload
├── 📁 models/              # Database Models
│   ├── 📄 User.js          # User Model
│   ├── 📄 Project.js       # Project Model
│   ├── 📄 Product.js       # Product Model
│   ├── 📄 Notification.js  # Notification Model
│   └── 📄 Audit.js         # Audit Trail Model
├── 📁 routes/              # API Routes
│   ├── 📄 auth.js          # Authentication Routes
│   ├── 📄 users.js         # User Routes
│   ├── 📄 projects.js      # Project Routes
│   ├── 📄 inventory.js     # Inventory Routes
│   ├── 📄 dashboard.js     # Dashboard Routes
│   └── 📄 notifications.js # Notification Routes
├── 📁 services/            # Business Logic Services
│   ├── 📄 emailService.js  # Email Service
│   ├── 📄 websocketService.js # WebSocket Service
│   ├── 📄 fileService.js   # File Upload Service
│   ├── 📄 notificationService.js # Notification Service
│   └── 📄 reportService.js # Report Generation
├── 📁 utils/               # Utility Functions
│   ├── 📄 logger.js        # Logging Utility
│   ├── 📄 validation.js    # Validation Helpers
│   ├── 📄 encryption.js    # Encryption Utilities
│   └── 📄 helpers.js       # General Helpers
├── 📁 uploads/             # File Upload Directory
├── 📁 logs/                # Application Logs
├── 📁 scripts/             # Utility Scripts
│   ├── 📄 seed.js          # Database Seeding
│   └── 📄 backup.js        # Backup Scripts
├── 📄 server.js            # Main Server File
├── 📄 package.json         # Backend Dependencies
├── 📄 Dockerfile           # Backend Docker Image
└── 📄 .env.example         # Environment Variables Template
```

### API Structure
```
API Endpoints:
├── 🔐 Authentication (/api/auth)
│   ├── POST /register      # User Registration
│   ├── POST /login         # User Login
│   ├── POST /logout        # User Logout
│   ├── POST /refresh       # Token Refresh
│   ├── POST /forgot-password # Password Reset Request
│   ├── POST /reset-password # Password Reset
│   └── GET /verify-email/:token # Email Verification
├── 👥 Users (/api/users)
│   ├── GET /               # Get All Users
│   ├── POST /              # Create User
│   ├── GET /:id            # Get User by ID
│   ├── PUT /:id            # Update User
│   ├── DELETE /:id         # Delete User
│   └── GET /profile        # Get Current User Profile
├── 📝 Projects (/api/projects)
│   ├── GET /               # Get All Projects
│   ├── POST /              # Create Project
│   ├── GET /:id            # Get Project by ID
│   ├── PUT /:id            # Update Project
│   ├── DELETE /:id         # Delete Project
│   └── POST /:id/tasks     # Add Task to Project
├── 📦 Inventory (/api/inventory)
│   ├── GET /               # Get All Products
│   ├── POST /              # Create Product
│   ├── GET /:id            # Get Product by ID
│   ├── PUT /:id            # Update Product
│   ├── DELETE /:id         # Delete Product
│   └── POST /:id/stock     # Update Stock
├── 📊 Dashboard (/api/dashboard)
│   ├── GET /stats          # Get Dashboard Statistics
│   ├── GET /charts         # Get Chart Data
│   └── GET /activity       # Get Recent Activity
└── 🔔 Notifications (/api/notifications)
    ├── GET /               # Get Notifications
    ├── POST /              # Create Notification
    ├── PUT /:id/read       # Mark as Read
    └── DELETE /:id         # Delete Notification
```

## 🐳 Docker Configuration

### Docker Files
```
docker/
├── 📄 docker-compose.yml    # Main Docker Compose
├── 📄 docker-compose.prod.yml # Production Override
├── 📄 docker-compose.dev.yml # Development Override
└── 📁 nginx/
    ├── 📄 nginx.conf        # Nginx Configuration
    ├── 📄 ssl/              # SSL Certificates
    └── 📄 logs/             # Nginx Logs
```

### Container Architecture
```
Services:
├── 🗄️ mongodb              # MongoDB Database
├── 🔴 redis                # Redis Cache
├── ⚙️ backend              # Node.js API Server
├── 🎨 frontend             # React Frontend
├── 🌐 nginx                # Reverse Proxy
└── 📊 pm2                  # Process Manager (Optional)
```

## 📚 Documentation

### Documentation Structure
```
docs/
├── 📁 api/                 # API Documentation
│   ├── 📄 authentication.md # Auth API Docs
│   ├── 📄 users.md         # Users API Docs
│   ├── 📄 projects.md      # Projects API Docs
│   └── 📄 inventory.md     # Inventory API Docs
├── 📁 guides/              # User Guides
│   ├── 📄 getting-started.md # Getting Started
│   ├── 📄 user-management.md # User Management
│   └── 📄 deployment.md    # Deployment Guide
├── 📁 architecture/        # Architecture Docs
│   ├── 📄 system-design.md # System Architecture
│   ├── 📄 database-schema.md # Database Schema
│   └── 📄 security.md      # Security Architecture
└── 📁 development/         # Development Docs
    ├── 📄 setup.md         # Development Setup
    ├── 📄 coding-standards.md # Coding Standards
    └── 📄 testing.md       # Testing Guide
```

## 🔧 Configuration Files

### Environment Configuration
```
Environment Files:
├── 📄 server/.env          # Backend Environment Variables
├── 📄 client/.env          # Frontend Environment Variables
├── 📄 .env.example         # Environment Template
└── 📄 .env.production      # Production Environment
```

### Build Configuration
```
Build Files:
├── 📄 client/vite.config.ts # Vite Configuration
├── 📄 client/tsconfig.json  # TypeScript Configuration
├── 📄 client/.eslintrc.js   # ESLint Configuration
├── 📄 client/.prettierrc    # Prettier Configuration
├── 📄 server/.eslintrc.js   # Backend ESLint
└── 📄 package.json          # Root Package Configuration
```

## 🧪 Testing Structure

### Test Organization
```
tests/
├── 📁 unit/                # Unit Tests
│   ├── 📁 backend/         # Backend Unit Tests
│   └── 📁 frontend/        # Frontend Unit Tests
├── 📁 integration/         # Integration Tests
│   ├── 📄 api.test.js      # API Integration Tests
│   └── 📄 database.test.js # Database Tests
├── 📁 e2e/                 # End-to-End Tests
│   ├── 📄 auth.test.js     # Authentication Flow
│   └── 📄 dashboard.test.js # Dashboard Flow
└── 📁 fixtures/            # Test Data
    ├── 📄 users.json       # User Test Data
    └── 📄 projects.json    # Project Test Data
```

## 📊 Database Schema

### Collections Structure
```
MongoDB Collections:
├── 📁 users                # User Accounts
│   ├── _id                 # ObjectId
│   ├── firstName           # String
│   ├── lastName            # String
│   ├── email               # String (Unique)
│   ├── password            # String (Hashed)
│   ├── role                # String (admin/manager/user)
│   ├── isActive            # Boolean
│   ├── isEmailVerified     # Boolean
│   ├── preferences         # Object
│   └── timestamps          # Created/Updated
├── 📁 projects             # Project Management
│   ├── _id                 # ObjectId
│   ├── title               # String
│   ├── description         # String
│   ├── status              # String
│   ├── priority            # String
│   ├── manager             # ObjectId (ref: users)
│   ├── team                # Array
│   ├── tasks               # Array
│   └── timestamps          # Created/Updated
├── 📁 products             # Inventory Items
│   ├── _id                 # ObjectId
│   ├── name                # String
│   ├── sku                 # String (Unique)
│   ├── category            # String
│   ├── price               # Object
│   ├── inventory           # Object
│   ├── supplier            # Object
│   └── timestamps          # Created/Updated
└── 📁 notifications        # System Notifications
    ├── _id                 # ObjectId
    ├── user                # ObjectId (ref: users)
    ├── title               # String
    ├── message             # String
    ├── type                # String
    ├── isRead              # Boolean
    └── timestamps          # Created/Updated
```

## 🔒 Security Features

### Security Implementation
```
Security Features:
├── 🔐 Authentication
│   ├── JWT Tokens          # Access & Refresh Tokens
│   ├── Password Hashing    # bcrypt with Salt
│   ├── Rate Limiting       # Express Rate Limit
│   └── Account Lockout     # Failed Login Protection
├── 🛡️ Authorization
│   ├── Role-Based Access   # Admin/Manager/User Roles
│   ├── Permission System   # Granular Permissions
│   └── Resource Protection # Owner/Admin Access
├── 🔒 Data Protection
│   ├── Input Validation    # Joi Validation
│   ├── SQL Injection       # Mongoose Protection
│   ├── XSS Protection      # Helmet.js Headers
│   └── CORS Configuration  # Cross-Origin Protection
└── 📝 Audit Trail
    ├── User Actions        # Track User Activities
    ├── System Events       # System Logging
    └── Security Events     # Security Monitoring
```

## 🚀 Performance Features

### Performance Optimizations
```
Performance Features:
├── ⚡ Frontend
│   ├── Code Splitting      # Lazy Loading
│   ├── Bundle Optimization # Vite Build
│   ├── Caching             # Browser Caching
│   └── Virtual Scrolling   # Large Lists
├── 🔄 Backend
│   ├── Database Indexing   # MongoDB Indexes
│   ├── Caching             # Redis Cache
│   ├── Compression         # Gzip Compression
│   └── Connection Pooling  # Database Connections
├── 📊 Monitoring
│   ├── Health Checks       # Service Monitoring
│   ├── Performance Metrics # Response Times
│   ├── Error Tracking      # Error Monitoring
│   └── Usage Analytics     # User Analytics
└── 🔧 Optimization
    ├── Image Optimization  # WebP Format
    ├── CDN Integration     # Static Assets
    ├── Database Queries    # Query Optimization
    └── Memory Management   # Garbage Collection
```

This project structure provides a scalable, maintainable, and secure foundation for the admin dashboard application. Each component is organized logically and follows best practices for modern web development.
