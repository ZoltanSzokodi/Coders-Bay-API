const mongoose = require('mongoose');

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log(
    `MongoDB Conncted: ${connect.connection.host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
