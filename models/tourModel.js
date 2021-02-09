const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
  },
});

const Tour = new mongoose.model('tour', tourSchema);

module.exports = Tour;
