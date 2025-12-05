# Authentication and Authorization Implementation

## Overview
This document describes the authentication and authorization system implemented in the backend.

## Requirements Implemented

### ✅ 1. Backend Authentication
- **Sign Up Endpoint**: `POST /api/auth/signup`
  - Creates a new user with encrypted password
  - Returns JWT token upon successful registration
  
- **Sign In Endpoint**: `POST /api/auth/signin`
  - Authenticates user with email and password
  - Returns JWT token upon successful authentication

### ✅ 2. Password Security
- All passwords are hashed using `bcryptjs` before storing in database
- Passwords are never stored in plain text
- Password hashing is applied in:
  - Authentication controller (signup)
  - User controller (create and update)

### ✅ 3. Backend Authorization Middleware
- JWT token-based authentication middleware created
- Middleware verifies token from `Authorization: Bearer <token>` header
- Attaches user information to request object for use in controllers

### ✅ 4. Protected Routes

#### Contacts (`/api/contacts`)
- ✅ **Protected**: POST (create), PUT (update), DELETE (delete)
- ✅ **Public**: GET (list all), GET by ID

#### Projects (`/api/projects`)
- ✅ **Protected**: POST (create), PUT (update), DELETE (delete)
- ✅ **Public**: GET (list all), GET by ID

#### Services (`/api/services`)
- ✅ **Protected**: POST (create), PUT (update), DELETE (delete)
- ✅ **Public**: GET (list all), GET by ID

#### Users (`/api/users`)
- ✅ **Protected**: PUT (update), DELETE (delete)
- ✅ **Public**: GET (list all), GET by ID, POST (create)

## API Endpoints

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

#### Sign In
```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Sign in successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com"
  }
}
```

### Protected Endpoints Usage

All protected endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Example:
```
POST /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "My Project",
  "description": "Project description"
}
```

## Files Created/Modified

### New Files
1. `app/controllers/auth.js` - Authentication controller (signup, signin)
2. `app/routers/auth.js` - Authentication routes
3. `app/middleware/auth.js` - JWT authentication middleware

### Modified Files
1. `server.js` - Added auth router
2. `app/controllers/users.js` - Added password hashing, removed password from responses
3. `app/routers/contacts.js` - Added authentication middleware to protected routes
4. `app/routers/projects.js` - Added authentication middleware to protected routes
5. `app/routers/services.js` - Added authentication middleware to protected routes
6. `app/routers/users.js` - Added authentication middleware to edit/delete routes
7. `package.json` - Added `bcryptjs` and `jsonwebtoken` dependencies

## Environment Variables

For production, set the following environment variable:
```
JWT_SECRET=your-secret-key-here
```

If not set, the system uses a default secret (not recommended for production).

## Security Features

1. **Password Hashing**: All passwords are hashed with bcrypt (10 salt rounds)
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Tokens expire after 24 hours
4. **Password Exclusion**: Passwords are never returned in API responses
5. **Error Handling**: Proper error messages without exposing sensitive information

## Testing

### Test Sign Up
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"firstname":"Test","lastname":"User","email":"test@example.com","password":"test123"}'
```

### Test Sign In
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test Protected Endpoint
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"name":"Test Project","description":"Description"}'
```

## Notes

- The frontend must store the JWT token and include it in the `Authorization` header for protected endpoints
- Token format: `Authorization: Bearer <token>`
- Unauthenticated requests to protected endpoints will return 401 Unauthorized
- All GET endpoints remain public (no authentication required)

