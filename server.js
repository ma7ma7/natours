require('dotenv').config({
  path: '.env',
});
const app = require('./app');

// Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listning ...', port);
});
