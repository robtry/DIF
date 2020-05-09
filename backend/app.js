const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');

// connect db
const dbConnection = require('./config/keys').mongoURI;
mongoose
	.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		console.log('Connected to the db correctly! :D');
		//check collections
		//console.log(Object.keys(mongoose.connection.collections));
	})
	.catch((err) => {
		console.log(`DB connection Error: ${err.message}`);
	});

// declare routes
const userRoutes = require('./routes/user-routes');
const nnaRoutes = require('./routes/nna-routes');
const templateRoutes = require('./routes/template-router');

// start the app
const app = express();

// set up middlewares
// - general
app.use(cors());
app.use(bodyParser.json());
// - routes
app.use('/users/', userRoutes);
app.use('/nnas/', nnaRoutes);
app.use('/templates/', templateRoutes)
app.use((req, res, next) => {
	next(new HttpError('Could not find this route', 404));
});
// handle errors
app.use((error, _, res, next) => {
	if (res.headerSent) {
		// ya lo handlea alguien mas
		return next(error);
	}
	res.status(error.code || 500).json({ message: error.message || 'Something went wrong in the server' });
});

// user a port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
