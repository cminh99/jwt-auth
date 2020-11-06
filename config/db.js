const mongoose = require('mongoose');

function connect() {
  try {
    mongoose
      .connect('mongodb://localhost:27017/jwt-auth-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => console.log('Database connected!'))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
