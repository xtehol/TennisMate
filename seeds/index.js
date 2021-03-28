const mongoose = require('mongoose');
const cities = require('./cities');
const { firstName } = require('./seedHelpersFirstName');
const { lastName } = require('./seedHelpersLastName');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/tennis-mate', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log('database connected!')
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await User.deleteMany({});
  for (let i = 0; i < 50; i++) {
    // const random1000 = Math.floor(Math.random() * 1000);
    const randomNum = (size) => Math.floor(Math.random() * size)
    const user = new User({
      firstName: sample(firstName),
      lastName: sample(lastName),
      ntrp: randomNum(7),
      // location: `${cities[random1000].city}, ${cities[random1000].state}`
      location: `${cities[randomNum(1000)].city}, ${cities[randomNum(1000)].state}`
    });
    await user.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});