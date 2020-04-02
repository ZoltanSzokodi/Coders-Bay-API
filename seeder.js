const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');
const User = require('./models/User');

// Connect ro DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
// Import data into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await User.create(users);

    console.log('Data imported...'.green.inverse);

    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data into DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    console.log('Data deleted...'.red.inverse);

    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// we need to run these commands in the console -> "node seeder -i" || "node seeder -d"
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
