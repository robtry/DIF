const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const templateCollection = require('../models/template-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createTemplate = (req, res, next) => {
	console.log('Creating template');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, tipo, descripcion } = req.body;

	//console.log(nombre, tipo, username, password);
	new templateCollection({ nombre, tipo, descripcion })
		.save()
		.then(() => {
			//console.log(ans);
			return res.status(201).json({ message: 'complete' });
		})
		.catch((err) => {
			console.log('Error creating template:', err);
			return next(new HttpError(err, 422));
		});
};

exports.updateTemplate = (req, res, next) => {
	console.log('Updating Template', req.params.id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, tipo, descripcion } = req.body;

	templateCollection.updateOne(
		{ _id: ObjectId(req.params.id) },
		{
			$set: {
				nombre,
				tipo,
				descripcion
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

exports.getAllTemplates = (req, res, next) => {
	console.log('Getting All Templates');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { type, page } = req.params;

	templateCollection
		.aggregate([
			{
				$skip: (page - 1) * 30
			},
			{
				$limit: 30
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

exports.getTotalRegs = (req, res, next) => {
	console.log('Getting total pages for template');
	templateCollection
		.estimatedDocumentCount()
		.then((ans) => {
			//console.log(res);
			res.json(ans);
		})
		.catch((err) => {
			console.log('Getting total pages template:', err);
			return next(new HttpError('Server error', 500));
		});
};

exports.getByName = (req, res, next) => {
	console.log('Searching by name');
	const { name } = req.params;
	templateCollection
		.aggregate([
			{
				$limit: 30
			},
			{
				$match: {
					nombre: {
						$regex: '(?i)' + name
					}
				}
			},
			{
				$lookup: {
					from: 'campos',
					localField: '_id',
					foreignField: 'id_plantilla',
					as: 'campos'
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

exports.deleteTemplate = (req, res, next) => {
	console.log('Delete Template', req.params.id);

	templateCollection.deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
		if (err) {
			return next(new HttpError(err, 500));
		}
	});
	res.json({ message: 'complete' });
};

exports.getTemplate = (req, res, next) => {
	console.log('Getting template', req.params.id);
	try {
		console.log(ObjectId(req.params.id));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	templateCollection
		.aggregate([
			{
				$match: {
					_id: ObjectId(req.params.id)
				}
			},
			{
				$lookup: {
					from: 'campos',
					localField: '_id',
					foreignField: 'id_plantilla',
					as: 'campos'
				}
			}
		])
		.exec((err, data) => {
			if (err) {
				console.log(err);
				return next(new HttpError(err, 404));
			}
			res.json(data);
		});
};
