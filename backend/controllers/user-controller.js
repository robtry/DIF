const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const userCollection = require('../models/user-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAllUsers = (req, res, next) => {
	console.log('Getting All Users');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { type, page } = req.params;

	userCollection
		.aggregate([
			{
				$skip: (page - 1) * 30
			},
			{
				$limit: 30
			},
			// {
			// 	$sort: {
			// 		name: 1
			// 	}
			// },
			{
				$match: {
					tipo: {
						$regex: type === 'all' ? '.*' : type
					}
				}
			}
		])
		.exec((err, data) => {
			if (err) {
				console.log(err);
				return next(new HttpError('Server error', 500));
			}
			res.json(data);
		});
};

const getUserById = (req, res, next) => {
	console.log('Get User By Id | Profile');
	console.log(req.params);
	return next(new HttpError('not found', 404));
};

exports.getHistoryUser = (req, res, next) => {
	console.log('User history, participations', req.params.id);
	res.json({ message: 'complete' });
};

exports.getTotalRegsHistory = (_, res, next) => {
	console.log('Getting total history pages');
	userCollection
		.estimatedDocumentCount()
		.then((ans) => {
			//console.log(res);
			res.json(ans);
		})
		.catch((err) => {
			console.log('Getting total pages:', err);
			return next(new HttpError('Server error', 500));
		});
};

exports.createUser = (req, res, next) => {
	console.log('Creating User');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, tipo, username, sexo } = req.body;
	const password = username;

	//console.log(nombre, tipo, username, password);
	new userCollection({ nombre, tipo, username, password, sexo })
		.save()
		.then(() => {
			//console.log(ans);
			return res.status(201).json({ message: 'complete' });
		})
		.catch((err) => {
			console.log('Error creating user:', err);
			if (err.errmsg && err.errmsg.includes('E11000 duplicate key error collection')) {
				return next(new HttpError('username already exists', 422));
			}
			return next(new HttpError('Server error', 500));
		});
};

exports.updateUser = (req, res, next) => {
	console.log('Updating User', req.params.id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, tipo, username, sexo } = req.body;

	userCollection.updateOne(
		{ _id: ObjectId(req.params.id) },
		{
			$set: {
				nombre,
				tipo,
				username,
				sexo
			}
		},
		(err) => {
			if (err) {
				return next(new HttpError(err, 500));
			}
			res.json({ message: 'complete' });
		}
	);
};

const updateUserPassword = (req, res, next) => {
	console.log('UpdatingPassword', req.params.id);
	const { password } = req.body;
	res.json({ message: 'complete' });
};

exports.deleteUser = (req, res, next) => {
	console.log('Delete User', req.params.id);

	userCollection.deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
		if (err) {
			return next(new HttpError(err, 500));
		}
	});
	res.json({ message: 'complete' });
};

const login = (req, res, next) => {
	console.log('Log in user');
	const { username, password } = req.body;
	return next(new HttpError('no log in', 401));
	res.json({ message: 'complete' });
};

exports.getByName = (req, res, next) => {
	console.log('Searching by name');
	const { name } = req.params;
	userCollection
		.aggregate([
			{
				$limit: 30
			},
			// {
			// 	$sort: {
			// 		name: 1
			// 	}
			// },
			{
				$match: {
					nombre: {
						$regex: '(?i)' + name
					}
				}
			}
		])
		.exec((err, data) => {
			if (err) {
				console.log('Searching by name:', err);
				return next(new HttpError('Server error', 500));
			}
			res.json(data);
		});
};

exports.getTotalRegs = (_, res, next) => {
	console.log('Getting total pages');
	userCollection
		.estimatedDocumentCount()
		.then((ans) => {
			//console.log(res);
			res.json(ans);
		})
		.catch((err) => {
			console.log('Getting total pages:', err);
			return next(new HttpError('Server error', 500));
		});
};

exports.getUserById = getUserById;
exports.updateUserPassword = updateUserPassword;
exports.login = login;
