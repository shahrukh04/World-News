# Admin Authentication System

## Overview

This document provides information about the admin authentication system implemented in the News application. The system allows for secure login and registration of admin users, with role-based access control to protect admin routes.

## Features

- Admin user registration (limited to 5 users)
- Secure login with JWT authentication
- Protected admin routes
- User management dashboard
- Password encryption using bcrypt

## Admin Routes

- `/login` - Admin login page
- `/register` - Admin registration page
- `/admin` - Main admin dashboard
- `/admin/users` - User management page

## Authentication Flow

1. **Registration**:
   - New admin users can register via the `/register` route
   - System enforces a maximum of 5 admin users
   - Passwords are securely hashed using bcrypt before storage

2. **Login**:
   - Admins can login via the `/login` route
   - System validates credentials and issues a JWT token
   - Token is stored in localStorage for persistent sessions

3. **Protected Routes**:
   - Admin routes are protected using the `ProtectedRoute` component
   - Unauthorized access attempts are redirected to the login page

4. **API Authentication**:
   - Backend API routes are protected using the `protect` middleware
   - JWT tokens are verified on each request to secure endpoints

## User Management

The User Management page allows administrators to:

- View all admin users in the system
- Add new admin users (via the registration page)
- Monitor when users were created

## Security Considerations

- JWT tokens expire after 7 days
- Passwords are never stored in plain text
- API routes are protected with authentication middleware
- Frontend routes use React Router's protection mechanism

## Implementation Details

### Backend

- User model with password hashing in `userModel.js`
- Authentication controllers in `userController.js`
- JWT middleware in `authMiddleware.js`
- Protected routes in `userRoute.js`

### Frontend

- Authentication context in `AuthContext.tsx`
- Login component in `Login.tsx`
- Registration component in `Register.tsx`
- Protected route wrapper in `ProtectedRoute.tsx`
- User management in `UserManagement.tsx`

## Getting Started

1. Register the first admin user at `/register`
2. Login with your credentials at `/login`
3. Access the admin dashboard at `/admin`
4. Manage users at `/admin/users`

## Troubleshooting

- If you cannot login, ensure the backend server is running
- If registration fails, check if the maximum user limit has been reached
- For token issues, try clearing localStorage and logging in again