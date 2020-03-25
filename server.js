const express = require('express');
const path = require('path');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello there!');
});

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
