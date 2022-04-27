const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

const connectDB = async () => {
  await Mongoose.connect(`mongodb://127.0.0.1:27017/asana`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectDB
}