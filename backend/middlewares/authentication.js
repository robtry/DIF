const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
const secretToken = require('../config/keys').secretToken;

exports.isAuth = async (req, _, next) => {
	if (req.headers.authorization) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const user = jwt.verify(token, secretToken);
			if (user) {
				req.user = user.id;
				next();
			} else {
				return next(new HttpError('error with token', 401));
			}
		} catch (err) {
			return next(new HttpError('error with token', 401));
		}
	} else {
		return next(new HttpError('Invalid headers', 422));
	}
};

exports.isAdmin = async (req, res, next) => {
	if (req.headers.authorization) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const user = jwt.verify(token, secretToken);
			if (user.tipo === 'admin') {
				req.user = user.id;
				next();
			} else {
				return next(new HttpError('error with token', 401));
			}
		} catch (err) {
			return next(new HttpError('error with token', 401));
		}
	} else {
		return next(new HttpError('Invalid headers', 422));
	}
};
