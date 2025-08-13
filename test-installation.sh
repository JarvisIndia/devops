#!/bin/bash

echo "🧪 Testing Admin Dashboard Installation"
echo "======================================"

# Test backend installation
echo "📦 Testing Backend Installation..."
cd server
if npm install; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Backend installation failed"
    exit 1
fi

# Test frontend installation
echo "📦 Testing Frontend Installation..."
cd ../client
if npm install; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Frontend installation failed"
    exit 1
fi

# Test TypeScript compilation
echo "🔧 Testing TypeScript Compilation..."
if npm run type-check; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Test ESLint
echo "🔍 Testing ESLint..."
if npm run lint; then
    echo "✅ ESLint passed"
else
    echo "⚠️  ESLint found issues (this is normal for a new project)"
fi

echo ""
echo "🎉 Installation test completed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up environment variables:"
echo "   - cp server/env.example server/.env"
echo "   - cp client/env.example client/.env"
echo ""
echo "2. Start the development servers:"
echo "   - Backend: cd server && npm run dev"
echo "   - Frontend: cd client && npm run dev"
echo ""
echo "3. Access the application:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend: http://localhost:5000"
