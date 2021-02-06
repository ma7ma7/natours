const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const app = express();

// Use middleware
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

// Router
app.use('/api/v1/tours', tourRouter);

// Server
const port = 8000;
app.listen(port, () => {
  console.log('Listning ...', port);
});
