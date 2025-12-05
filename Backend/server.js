var express = require('express');
var cors = require('cors');
var createError = require('http-errors');
var logger = require('morgan');
var configDb = require('./config/db');

// Load routers with error handling
var indexRouter, authRouter, userRouter, contactRouter, projectRouter, serviceRouter;

try {
    console.log('Loading routers...');
    indexRouter = require('./app/routers/index.js');
    console.log('✅ Index router loaded');
    
    authRouter = require('./app/routers/auth.js');
    console.log('✅ Auth router loaded');
    
    userRouter = require('./app/routers/users.js');
    console.log('✅ Users router loaded');
    
    contactRouter = require('./app/routers/contacts.js');
    console.log('✅ Contacts router loaded');
    
    projectRouter = require('./app/routers/projects.js');
    console.log('✅ Projects router loaded');
    
    serviceRouter = require('./app/routers/services.js');
    console.log('✅ Services router loaded');
} catch (error) {
    console.error('❌ ERROR LOADING ROUTERS:', error);
    console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        code: error.code
    });
    process.exit(1);
}

var app = express();

// Log route registration for debugging
console.log('Registering routes...');
console.log('  - /api (index)');
console.log('  - /api/auth (authentication)');
console.log('  - /api/users');
console.log('  - /api/contacts');
console.log('  - /api/projects');
console.log('  - /api/services');

configDb();

// CORS configuration - allow requests from frontend
// In production, you can specify exact origins for better security
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Allow all origins by default, or set FRONTEND_URL env var
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(logger('dev') );

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount index controller under /api so the frontend can be served at root
console.log('Mounting API routes...');
app.use('/api', indexRouter);
console.log('  ✅ /api mounted');

app.use('/api/auth', authRouter);
console.log('  ✅ /api/auth mounted - signup and signin routes available');

app.use('/api/users', userRouter);
console.log('  ✅ /api/users mounted');

app.use('/api/contacts', contactRouter);
console.log('  ✅ /api/contacts mounted');

app.use('/api/projects', projectRouter);
console.log('  ✅ /api/projects mounted');

app.use('/api/services', serviceRouter);
console.log('  ✅ /api/services mounted');

// Log successful route registration
console.log('\n✅ All routes registered successfully');
console.log('✅ Auth routes available at:');
console.log('   - POST /api/auth/signup');
console.log('   - POST /api/auth/signin\n');

// Serve frontend static files if the frontend has been built
const path = require('path');
const fs = require('fs');

// Common build output locations for different setups
const possibleClientPaths = [
  path.join(__dirname, 'frontend', 'dist'),           // usual Vite build inside `frontend`
  path.join(__dirname, 'frontend', 'client', 'dist'), // earlier projects used frontend/client/dist
  path.join(__dirname, 'frontend', 'build')           // create-react-app style
];

let clientDistPath = null;
for (const p of possibleClientPaths) {
  if (fs.existsSync(p)) {
    clientDistPath = p;
    console.log(`Serving frontend from: ${clientDistPath}`);
    break;
  }
}

if (clientDistPath) {
  app.use(express.static(clientDistPath));

  // For client-side routing, serve index.html for unknown non-API routes
  app.get(/^\/(?!api).*$/, function (req, res) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  console.log('No built frontend detected. Build your frontend into one of: ' + possibleClientPaths.join(', '));
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
