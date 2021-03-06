const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.ENV === 'Test') {
	mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
	mongoose.connect('mongodb://localhost/bookAPI');
}

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', bookRouter);
app.get('/', (req, res) => {
	res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Running on port ${port}...`);
});

module.exports = app;
