const mongoose = require('mongoose');
require('dotenv').config({
  path: '.env',
});
const app = require('./app');

// DB Connection
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection to db success');
  });

// Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listning ...', port);
});
