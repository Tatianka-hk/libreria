const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const Authrouter = require('./routes/auth');
const Bookrouter = require('./routes/book');
const Userrouter = require('./routes/user');

app.use('/auth', Authrouter);
app.use('/books', Bookrouter);
app.use('/user', Userrouter);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

const bd = process.env.mongo;
console.log(bd);
mongoose
  .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connection to DB'))
  .catch((error) => console.log(error)); // "no connection to DB"

app.get('/', (req, res, next) => {
  res.send('Todo es bueno');
});

// app.post("/auth/login", (req, res, next)=>{
//     console.log("catched o ha cagido");
//     console.log(req.body.user)
// })
