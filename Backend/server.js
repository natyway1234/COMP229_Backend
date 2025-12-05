var express = require('express');
var cors = require('cors');
var createError = require('http-errors');
var logger = require('morgan');
var configDb = require('./config/db');

var indexRouter = require('./app/routers/index.js');
var authRouter = require('./app/routers/auth.js');
var userRouter = require('./app/routers/users.js');
var contactRouter = require('./app/routers/contacts.js');
var projectRouter = require('./app/routers/projects.js');
var serviceRouter = require('./app/routers/services.js');

var app = express();

// Initialize database connection
console.log('====> Starting backend server...');
console.log('====> Initializing database connection...');

// Connect to database (async)
configDb().catch(err => {
    console.error('====> Failed to connect to database:', err);
    console.error('====> Server will continue but database operations may fail');
});

// CORS configuration - allow frontend on Render and localhost for development
const allowedOrigins = [
  'https://comp229-2025-2olw.onrender.com', // Your Render frontend
  'http://localhost:5173', // Local development
  'https://localhost:5173', // Local development (HTTPS)
  process.env.FRONTEND_URL // Allow environment variable override
].filter(Boolean); // Remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman, curl, or server-to-server)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // For development, allow all origins; restrict in production
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root route - API information
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is running',
    endpoints: {
      home: '/api',
      auth: '/api/auth (signup, signin)',
      contacts: '/api/contacts',
      projects: '/api/projects',
      services: '/api/services',
      users: '/api/users'
    },
    version: '1.0.0'
  });
});

// API routes
app.use('/api', indexRouter);
app.use('/api/auth', authRouter); // Authentication routes (signup, signin)
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // create the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('========================================');
  console.log(`====> Backend Server running at http://localhost:${PORT}/`);
  console.log(`====> CORS enabled for:`);
  console.log(`     - https://comp229-2025-2olw.onrender.com (Render frontend)`);
  console.log(`     - http://localhost:5173 (Local development)`);
  console.log('====> Waiting for database connection...');
  console.log('========================================');
});
