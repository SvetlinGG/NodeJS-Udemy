const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
//const router = require('/routes/tourRoutes')



const app = express();

// 1) Middlewares
app.use(morgan('dev'));

app.use(express.json());


app.use((req, res, next) => {
    console.log('Hello from the Middleware!!');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})




// 3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/tours', userRouter);

// 4) Start Server
const port = 3000;
app.listen(port, () => console.log(`App listening on port: ${port}...`))