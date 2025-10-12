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

configDb();

// CORS configuration - allow all origins for development
app.use(cors());
app.use(logger('dev') );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes must come BEFORE static file serving
app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);

// Serve frontend static files if the frontend has been built
const path = require('path');
const fs = require('fs');
const clientDistPath = path.join(__dirname, 'frontend', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // For client-side routing, serve index.html for unknown non-API routes
  app.get(/^\/(?!api).*$/, function (req, res) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

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
  console.log(`Server running at http://localhost:${PORT}/`);
});
