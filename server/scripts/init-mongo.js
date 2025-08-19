// Create admin user for the admin-dashboard database
db.getSiblingDB('admin-dashboard').createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'admin-dashboard'
    }
  ]
});

// Switch to the admin-dashboard database
db = db.getSiblingDB('admin-dashboard');

// Create test users
db.users.insertMany([
  {
    email: 'admin@example.com',
    password: '$2b$10$ZeQ/oUJdwVKD75kCuYHF5.MYK7EnnOQ4QrVSjyozERZYU1nC2Jy/e', // "admin123"
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'manager@example.com',
    password: '$2b$10$ZeQ/oUJdwVKD75kCuYHF5.MYK7EnnOQ4QrVSjyozERZYU1nC2Jy/e', // "admin123"
    firstName: 'Manager',
    lastName: 'User',
    role: 'manager',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'user@example.com',
    password: '$2b$10$ZeQ/oUJdwVKD75kCuYHF5.MYK7EnnOQ4QrVSjyozERZYU1nC2Jy/e', // "admin123"
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create some test projects
db.projects.insertMany([
  {
    name: 'Website Redesign',
    description: 'Complete redesign of company website',
    status: 'in-progress',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Mobile App Development',
    description: 'Development of new mobile application',
    status: 'planning',
    startDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create some test products
db.products.insertMany([
  {
    name: 'Laptop',
    description: 'High-performance laptop',
    category: 'Electronics',
    price: 1299.99,
    quantity: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Office Chair',
    description: 'Ergonomic office chair',
    category: 'Furniture',
    price: 299.99,
    quantity: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
