const mongoose = require('mongoose');
// const DB_URI = 'mongodb://localhost:27017/quizz';
const urlDatabase = 'mongodb://localhost:27017/quizz'
// const Questions = mongoose.model('questions',questionsSchema, 'questions');
// const Users = mongoose.model('users',userSchema, 'users');
const db= mongoose.connection;

mongoose
  .connect(urlDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info('Connected to DB!');
  })
  .catch((err) => console.error(err));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('> mongoose succesfully disconnected!');
    process.exit(0);
  });
});
module.exports = mongoose;