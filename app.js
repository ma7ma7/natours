const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const app = express();

// Use middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

// Router
app.use('/api/v1/tours', tourRouter);

module.exports = app;
