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
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

// Routes Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    NumberOfTours: tours.length,
    requestedTime: req.reqTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

// Router
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

// Handling Routs
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Server
const port = 8000;
app.listen(port, () => {
  console.log('Listning ...', port);
});
