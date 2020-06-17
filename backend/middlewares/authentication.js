const HttpError = require('../models/http-error');
const userCollection = require('../models/user-model');

exports.isRegistered = async (req, _, next) => {
	try {
		const token = req.headers.authorization;
		const user = await userCollection.findById(token);
		if (user) {
			next();
		} else {
			return next(new HttpError('error with id user', 401));
		}
	} catch (err) {
		return next(new HttpError('error with id user', 401));
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await userCollection.findById(token);
		if (user.tipo === 'admin') {
			next();
		} else {
			return next(new HttpError('error with id user', 401));
		}
	} catch (err) {
		return next(new HttpError('error with id user', 401));
	}
};
