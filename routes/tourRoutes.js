const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  isIdProvided,
} = require('../controllers/tourController');

const router = express.Router();

// Middleware
router.param('id', isIdProvided);

// Handling Routs
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
