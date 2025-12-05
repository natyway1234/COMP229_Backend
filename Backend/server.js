var express = require('express');
var cors = require('cors');
var createError = require('http-errors');
var logger = require('morgan');
var configDb = require('./config/db');

var indexRouter = require('./app/routers/index.js');
var userRouter = require('./app/routers/users.js');
var contactRouter = require('./app/routers/contacts.js');
var projectRouter = require('./app/routers/projects.js');
var serviceRouter = require('./app/routers/services.js');

var app = express();

console.log('====> Starting backend server...');
console.log('====> Initializing database connection...');
configDb();

// CORS configuration - allow frontend running on port 5173
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api', indexRouter);
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
  console.log(`====> CORS enabled for frontend: http://localhost:5173/`);
  console.log('====> Waiting for database connection...');
  console.log('========================================');
});
