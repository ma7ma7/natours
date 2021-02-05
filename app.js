const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Read File from dev-data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, {
    encoding: 'utf8',
  })
);
// Use middleware
app.use(express.json());
app.use(morgan('dev'));

// Handling Routs
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    NumberOfTours: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      message: 'Coud not find tour',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const tour = Object.assign({ id: newId }, req.body);
  tours.push(tour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: tour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      message: 'Coud not find tour',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Tour will updated>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Error',
      message: 'Coud not find tour',
    });
  }

  res.status(204).json({
    status: 'Success',
    data: {
      tour: '<Tour will deletd>',
    },
  });
});

// Server
const port = 8000;
app.listen(port, () => {
  console.log('Listning ...', port);
});
