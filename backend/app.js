const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const HttpError = require('./models/http-error');

// connect db
const dbConnection = require('./config/keys').mongoURI;
mongoose
	.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		console.log('Connected to the db correctly!');
	})
	.catch((err) => {
		console.log(`DB connection Error: ${err.message}`);
	});

// declare routes
const userRoutes = require('./routes/user-routes');
const nnaRoutes = require('./routes/nna-routes');
const templateRoutes = require('./routes/template-router');
const formatRoutes = require('./routes/format-routes');
const dashboardRoutes = require('./routes/dashboard-route');

// start the app
const app = express();

// set up middlewares
const finaluploadsPath = process.env.UPLOADS_PATH;
// - general
app.use(cors());
app.use(bodyParser.json());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp',
		preserveExtension: true,
		createParentPath: true
	})
);
// - routes
app.use(finaluploadsPath, express.static(path.resolve(finaluploadsPath)));
app.use('/dashboard/', dashboardRoutes);
app.use('/users/', userRoutes);
app.use('/nnas/', nnaRoutes);
app.use('/templates/', templateRoutes);
app.use('/formats/', formatRoutes);
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
