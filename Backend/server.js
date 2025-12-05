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

console.log('====> Starting backend server...');
console.log('====> Initializing database connection...');

configDb().catch(err => {
    console.error('====> Failed to connect to database:', err);
    console.error('====> Server will continue but database operations may fail');
});

const allowedOrigins = [
  'https://comp229-2025-2olw.onrender.com',
  'http://localhost:5173',
  'https://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
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

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

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
