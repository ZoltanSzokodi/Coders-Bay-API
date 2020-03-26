const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({path: './config/config.env'});

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

connectDB();

const bootcamps = require('./routes/bootcamps');

app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`DB ERROR: ${error.message}`.red.bold);
  // Close server and exit process
  server.close(() => process.exit(1));
});
