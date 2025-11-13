const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.log('DB connection failed:', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
});

