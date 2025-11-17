const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModels');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(() => console.log('DB connection successful!'));

// Read JSON file

const tours = JSON.parse(fs.futimesSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into DB

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded!');
        
    } catch (err) {
        console.log(err);
        
    }
};

// Delete data from DB

const deleteData = async () => {
    try {
        await Tour.deleteMany(tours);
        console.log('Data successfully deleted!');
        
    } catch (err) {
        console.log(err);
        
    }
};
if (process.argv[2] === '--import') {
    importData();
} else if( process.argv[2] === '--delete') {
    deleteData();
}
