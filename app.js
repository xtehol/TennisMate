const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/tennis-mate', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
  console.log('database connected!')
});

const app = express();
app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/users', async (req, res) => {
  const users = await User.find({});
  res.render('users/index', { users });
})

app.get('/users/new', async (req, res) => {
  res.render('users/new');
})
app.post('/users', async (req, res) => {
  const user = new User(req.body.user);
  await user.save();
  res.redirect(`/users/${user._id}`);
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/show', { user });
})

app.get('/users/:id/edit', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', { user });
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { ...req.body.user });
  res.redirect(`/users/${user._id}`);
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/users');
})

app.listen(3000, () => {
  console.log('serving on port 3000');
})