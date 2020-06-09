const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const userCollection = require('../models/user-model');
const historyCollection = require('../models/history-model');
const bcrypt = require('bcryptjs');
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
			{
				$project: { password: 0 }
			},
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

// exports.getUserById = (req, res, next) => {
// 	console.log('Get User By Id | Profile');
// 	console.log(req.params.id);
// 	return next(new HttpError('not found', 404));
// };

exports.getHistoryUser = async (req, res, next) => {
	console.log('User history, participations', req.params.id);
	let { id_usuario, page } = req.params;
	try {
		id_usuario = ObjectId(req.params.id);
	} catch (error) {
		next(new HttpError('Invalid id', 422));
	}

	const history = await historyCollection.aggregate([
		{
			$match: {
				id_usuario
			}
		},
		{
			$skip: (page - 1) * 30
		},
		{
			$limit: 30
		},
		{
			$lookup: {
				from: 'usuarios',
				localField: 'id_usuario',
				foreignField: '_id',
				as: 'usuario'
			}
		},
		{
			$unwind: {
				path: '$usuario',
				preserveNullAndEmptyArrays: false
			}
		},
		{
			$lookup: {
				from: 'nnas',
				localField: 'id_nna',
				foreignField: '_id',
				as: 'nna'
			}
		},
		{
			$unwind: {
				path: '$nna',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: 'formatos',
				localField: 'id_formato',
				foreignField: '_id',
				as: 'formato'
			}
		},
		{
			$unwind: {
				path: '$formato',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$sort: {
				fecha: -1
			}
		}
	]);
	res.json(history);
};

exports.getTotalRegsHistory = async (req, res, next) => {
	console.log('Getting total history pages');
	let { id_usuario } = req.params;
	try {
		id_usuario = ObjectId(req.params.id);
	} catch (error) {
		next(new HttpError('Invalid id', 422));
	}
	const history = await historyCollection.aggregate([
		[
			{
				$match: {
					id_usuario
				}
			},
			{
				$lookup: {
					from: 'usuarios',
					localField: 'id_usuario',
					foreignField: '_id',
					as: 'usuario'
				}
			},
			{
				$unwind: {
					path: '$usuario',
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$lookup: {
					from: 'nnas',
					localField: 'id_nna',
					foreignField: '_id',
					as: 'nna'
				}
			},
			{
				$unwind: {
					path: '$nna',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$lookup: {
					from: 'formatos',
					localField: 'id_formato',
					foreignField: '_id',
					as: 'formato'
				}
			},
			{
				$unwind: {
					path: '$formato',
					preserveNullAndEmptyArrays: true
				}
			}
		]
	]);

	res.json(history.length);
};

exports.createUser = (req, res, next) => {
	console.log('Creating User');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, tipo, username, sexo } = req.body;

	bcrypt.genSalt(12, function(err, salt) {
		if (err) {
			return next(new HttpError('Can not create user', 500));
		}
		bcrypt.hash(username, salt, function(err, hash) {
			if (err) {
				return next(new HttpError('Can not create user', 500));
			}
			new userCollection({ nombre, tipo, username, password: hash, sexo })
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
		});
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

exports.updateUserPassword = (req, res, next) => {
	console.log('Updating Password', req.params.id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}
	const { current_password, new_password } = req.body;

	userCollection.findOne({ _id: ObjectId(req.params.id) }, (err, user) => {
		if (err) {
			return next(new HttpError('Server error', 500));
		}
		if (!user) {
			return next(new HttpError('Bad user id', 422));
		}

		bcrypt.compare(current_password, user.password, function(err, result) {
			if (err) {
				return next(new HttpError('Server error', 500));
			}
			if (result) {
				// was ok
				bcrypt.genSalt(12, function(err, salt) {
					if (err) {
						return next(new HttpError('Can not update user', 500));
					}
					bcrypt.hash(new_password, salt, function(err, hash) {
						if (err) {
							return next(new HttpError('Can not update user', 500));
						}
						user
							.update({ $set: { password: hash } })
							.then(() => {
								//console.log(ans);
								return res.status(201).json({ message: 'complete' });
							})
							.catch((err) => {
								return next(new HttpError('Server error', 500));
							});
					});
				});
			} else {
				return next(new HttpError('Password not match', 422));
			}
		});
	});
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

exports.getByName = (req, res, next) => {
	console.log('Searching by name');
	const { name } = req.params;
	userCollection
		.aggregate([
			{
				$limit: 30
			},
			{
				$project: { password: 0 }
			},
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

exports.login = (req, res, next) => {
	console.log('Loggin user');
	const { username, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}
	userCollection.findOne({ username }, (err, user) => {
		if (err) {
			return next(new HttpError('Server error', 500));
		}
		if (!user) {
			return next(new HttpError('Log in failed', 422));
		}

		bcrypt.compare(password, user.password, function(err, result) {
			if (err) {
				return next(new HttpError('Server error', 500));
			}

			if (result) {
				// was ok
				return res.json(user);
			}
			return next(new HttpError('Log in failed', 422));
		});
	});
};

exports.resetPassword = (req, res, next) => {
	console.log('resetting user password');

	userCollection.findOne({ _id: ObjectId(req.params.id) }, (err, user) => {
		if (err) {
			return next(new HttpError('Server error', 500));
		}
		if (!user) {
			return next(new HttpError('User not found', 422));
		}

		bcrypt.genSalt(12, function(err, salt) {
			if (err) {
				return next(new HttpError('Can not update user', 500));
			}
			bcrypt.hash(user.username, salt, function(err, hash) {
				if (err) {
					return next(new HttpError('Can not update user', 500));
				}

				user
					.update({ $set: { password: hash } })
					.then(() => {
						//console.log(ans);
						return res.json({ message: 'complete' });
					})
					.catch((err) => {
						return next(new HttpError('Server error' + err, 500));
					});
			});
		});
	});
};
