# Environment Setup Guide

This guide explains how to run the World News application in both **Production** and **Local Development** modes.

## 🌐 Live URLs

- **Frontend (Production)**: https://www.worldnew.in
- **Backend (Production)**: https://world-news-skvr.onrender.com
- **Frontend (Local)**: http://localhost:3000
- **Backend (Local)**: http://localhost:5000

## 📁 Environment Files

The application uses different environment files for different modes:

### Backend Environment Files
- `.env` - Default environment variables
- `.env.local` - Local development configuration
- `.env.production` - Production configuration

### Frontend Environment Files
- `.env` - Default environment variables
- `.env.local` - Local development configuration
- `.env.production` - Production configuration

## 🚀 Running the Application

### Local Development Mode

#### Backend (Local)
```bash
cd backend

# Install dependencies
npm install

# Run in local development mode
npm run dev
# OR
npm run start:local
```

#### Frontend (Local)
```bash
cd frontend

# Install dependencies
npm install

# Run in local development mode
npm run dev:local
# OR
npm run dev
```

### Production Mode (Local Testing)

#### Backend (Production Config)
```bash
cd backend

# Run with production configuration
npm run start:prod
# OR for development with production config
npm run dev:prod
```

#### Frontend (Production Config)
```bash
cd frontend

# Run development server with production API
npm run dev:prod

# Build for production
npm run build:prod

# Preview production build
npm run preview:prod
```

## 🔧 Configuration Details

### Backend Configuration

#### Local Development (`.env.local`)
- **API URL**: http://localhost:5000
- **Frontend URL**: http://localhost:3000
- **CORS Origins**: localhost:3000, 127.0.0.1:3000
- **Environment**: development

#### Production (`.env.production`)
- **API URL**: https://world-news-skvr.onrender.com
- **Frontend URL**: https://www.worldnew.in
- **CORS Origins**: www.worldnew.in, worldnew.in
- **Environment**: production

### Frontend Configuration

#### Local Development (`.env.local`)
- **API URL**: http://localhost:5000/api
- **Site URL**: http://localhost:3000
- **Site Name**: World News - Dev

#### Production (`.env.production`)
- **API URL**: https://world-news-skvr.onrender.com/api
- **Site URL**: https://www.worldnew.in
- **Site Name**: World News

## 🛠️ Available Scripts

### Backend Scripts
- `npm start` - Start server with default config
- `npm run start:local` - Start with local development config
- `npm run start:prod` - Start with production config
- `npm run dev` - Development mode with nodemon (local config)
- `npm run dev:prod` - Development mode with nodemon (production config)

### Frontend Scripts
- `npm run dev` - Development server (default)
- `npm run dev:local` - Development server with local config
- `npm run dev:prod` - Development server with production API
- `npm run build` - Build for production
- `npm run build:local` - Build for local development
- `npm run build:prod` - Build for production
- `npm run preview:local` - Preview local build
- `npm run preview:prod` - Preview production build

## 🔄 Switching Between Modes

### Quick Switch Commands

#### To Local Development Mode:
```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev:local
```

#### To Production Mode (Local Testing):
```bash
# Backend
cd backend && npm run dev:prod

# Frontend (new terminal)
cd frontend && npm run dev:prod
```

## 🌍 CORS Configuration

The backend automatically configures CORS based on the environment:

- **Local**: Allows `localhost:3000` and `127.0.0.1:3000`
- **Production**: Allows `www.worldnew.in` and `worldnew.in`

## 📝 Notes

1. **Environment Detection**: The backend automatically loads the correct environment file based on `NODE_ENV`
2. **Fallback Configuration**: If specific environment files don't exist, the application falls back to the default `.env` file
3. **CORS Security**: Production mode has strict CORS policies for security
4. **API Proxy**: The frontend development server proxies API calls to the backend
5. **Build Optimization**: Production builds are optimized with code splitting and minification

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure you're using the correct environment configuration
2. **API Connection**: Verify the backend is running and accessible
3. **Environment Variables**: Check that all required environment variables are set
4. **Port Conflicts**: Ensure ports 3000 and 5000 are available

### Debug Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Check production backend
curl https://world-news-skvr.onrender.com/api/health
```

## 🔐 Security Considerations

- Never commit sensitive environment variables to version control
- Use different JWT secrets for different environments
- Ensure HTTPS is used in production
- Regularly rotate API keys and secrets