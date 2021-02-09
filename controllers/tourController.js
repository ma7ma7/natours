const Tour = require('../models/tourModel');
// const fs = require('fs');

// Read File from dev-data
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, {
//     encoding: 'utf8',
//   })
// );

// let tour;

// Params middleware
// exports.isIdProvided = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   tour = tours.find((tour) => tour.id === id);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'Error',
//       message: 'Coud not find tour',
//     });
//   }

//   next();
// };

// Routes Handlers
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'Success',
      NumberOfTours: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error',
      message: 'Coud not find tours',
    });
  }
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      // tour,
    },
  });
};

exports.createTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const tour = Object.assign({ id: newId }, req.body);
  // tours.push(tour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'Success',
  //       data: {
  //         tour: tour,
  //       },
  //     });
  //   }
  // );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Tour will updated>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: {
      tour: '<Tour will deletd>',
    },
  });
};
