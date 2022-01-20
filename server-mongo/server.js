const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/users');
app.use('/users', userRoute);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome' }));

module.exports = app;