const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`), {
  encoding: 'utf8',
});

require('dotenv').config({
  path: '.env',
});

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Step 1 - DB Connection success');
  });

const importData = async (data) => {
  try {
    await Tour.create(tours);
    console.log('Step 2 - Data Success Loaded');
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Step 2 - Data Was deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
