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
    // 1 - Filtring - Build QueryObject
    const queryObject = { ...req.query };
    const excludedFeilds = ['page', 'sort', 'limit', 'fields'];
    excludedFeilds.forEach((el) => delete queryObject[el]);

    // 2 - Advanced filtring - Start the queryString
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(queryStr);

    // Prepare Query
    let query = Tour.find(JSON.parse(queryStr));

    // 3 - sorting
    if (req.query.sort) {
      const sortedby = req.query.sort.splite(',').join(' ');
      query = query.sort(sortedby);
    }

    // Execute Query
    const tours = await query;

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

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'Success',
      data: {
        tour: null,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'Error',
      message: err,
    });
  }
};
