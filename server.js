const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Load env variables
dotenv.config({path: './config/config.env'});

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const bootcamps = require('./routes/bootcamps');

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
