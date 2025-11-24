const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const Tour = require('./models/tourModels');

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB)
  .then(async () => {
    console.log('DB connection successful!');
    
    // Create a test tour with start dates in 2021
    const testTour = await Tour.create({
      name: 'Test Tour 2021',
      duration: 7,
      maxGroupSize: 25,
      difficulty: 'easy',
      price: 497,
      summary: 'Test tour for monthly plan',
      imageCover: 'test-cover.jpg',
      startDates: [
        new Date('2021-03-15'),
        new Date('2021-06-20'),
        new Date('2021-09-10')
      ]
    });
    
    console.log('Test tour created:', testTour.name);
    process.exit(0);
  })
  .catch(err => {
    console.log('Error:', err.message);
    process.exit(1);
  });