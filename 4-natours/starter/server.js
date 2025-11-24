const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');



const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.log('DB connection failed:', err.message));
    





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}...`);
});
