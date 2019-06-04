const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const path = require('path');
const config = require('config');

const app = express();

//bodyparser middle ware
app.use(express.json());

//db config
const db = config.get('mongoURI');

//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//Serve static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
