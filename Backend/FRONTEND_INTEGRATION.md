# Frontend Integration Guide

## Backend API Configuration

### Base URL
```
http://localhost:3000/api
```

### Available Endpoints

#### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts` - Delete all contacts
- `DELETE /api/contacts/:id` - Delete contact by ID

#### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects` - Delete all projects
- `DELETE /api/projects/:id` - Delete project by ID

#### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services` - Delete all services
- `DELETE /api/services/:id` - Delete service by ID

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users` - Delete all users
- `DELETE /api/users/:id` - Delete user by ID

## Frontend Configuration

Your frontend should be configured to use:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### Example API Calls

```javascript
// Get all contacts
fetch('http://localhost:3000/api/contacts')
  .then(res => res.json())
  .then(data => console.log(data));

// Create a contact
fetch('http://localhost:3000/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello'
  })
});
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)

## Verification Checklist

- [ ] Frontend API base URL is set to `http://localhost:3000/api`
- [ ] Backend server is running on port 3000
- [ ] Frontend is running on port 5173
- [ ] CORS is properly configured (already done in backend)
- [ ] MongoDB connection is working (check backend terminal)

