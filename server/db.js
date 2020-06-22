const mongoose = require('mongoose');
require('dotenv');

const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDb connected');
  } catch (error) {
    console.error(error.message);
    console.log(db);
    process.exit(1);
  }
};

module.exports = connectDB;
