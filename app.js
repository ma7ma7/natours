const express = require('express');
const fs = require('fs');

const app = express();

// Read File from dev-data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, {
    encoding: 'utf8',
  })
);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Success',
    NumberOfTours: tours.length,
    data: {
      tours,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('Listning');
});
