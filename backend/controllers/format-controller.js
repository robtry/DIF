const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const formatCollection = require('../models/format-model');
const historyCollection = require('../models/history-model');
const paticipationCollection = require('../models/participation-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createFormat = (req, res, next) => {
	console.log('Creating formart');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { id_plantilla, id_nna } = req.body;

	try {
		console.log(ObjectId(id_nna));
		console.log(ObjectId(id_plantilla));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	const fecha_creacion = new Date();
	const ultima_actualizacion = new Date();

	new formatCollection({
		id_nna: ObjectId(id_nna),
		id_plantilla: ObjectId(id_plantilla),
		ultima_actualizacion,
		fecha_creacion
	})
		.save()
		.then(
			(/*ans*/) => {
				//console.log('Complete', ans);
				return res.status(201).json({ message: 'complete' });
			}
		)
		.catch((err) => {
			console.log('Error creating format:', err);
			return next(new HttpError(err.errmsg, 422));
		});
};

exports.getAllFormatsForNNA = (req, res, next) => {
	console.log('Getting Alllll Formats');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { type, page, id_nna } = req.params;

	try {
		console.log(ObjectId(id_nna));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	formatCollection
		.aggregate([
			{
				$skip: (page - 1) * 30
			},
			{
				$limit: 30
			},
			{
				$lookup: {
					from: 'plantillas',
					localField: 'id_plantilla',
					foreignField: '_id',
					as: 'plantilla'
				}
			},
			{
				$unwind: {
					path: '$plantilla',
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$lookup: {
					from: 'campos',
					localField: 'id_plantilla',
					foreignField: 'id_plantilla',
					as: 'campos'
				}
			},
			{
				$lookup: {
					from: 'respuestas',
					localField: '_id',
					foreignField: 'id_formato',
					as: 'respuestas'
				}
			},
			{
				$match: {
					'plantilla.tipo': {
						$regex: type === 'all' ? '.*' : type
					},
					id_nna: ObjectId(id_nna)
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

exports.getByName = (req, res, next) => {
	console.log('Searching by name');
	const { name, id_nna } = req.params;

	try {
		console.log(ObjectId(id_nna));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	formatCollection
		.aggregate([
			{
				$limit: 30
			},
			{
				$lookup: {
					from: 'plantillas',
					localField: 'id_plantilla',
					foreignField: '_id',
					as: 'plantilla'
				}
			},
			{
				$unwind: {
					path: '$plantilla',
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$match: {
					'plantilla.nombre': {
						$regex: '(?i)' + name
					},
					id_nna: ObjectId(id_nna)
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

exports.getTotalRegs = (req, res, next) => {
	console.log('Getting total pages for formats');
	formatCollection
		.estimatedDocumentCount()
		.then((ans) => {
			//console.log(res);
			res.json(ans);
		})
		.catch((err) => {
			console.log('Getting total pages formats:', err);
			return next(new HttpError('Server error', 500));
		});
};

exports.getOneFormat = (req, res, next) => {
	console.log('Getting one format');

	const { id } = req.params;

	try {
		console.log(ObjectId(id));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	formatCollection
		.aggregate([
			{
				$match: {
					_id: ObjectId(id)
				}
			},
			{
				$lookup: {
					from: 'plantillas',
					localField: 'id_plantilla',
					foreignField: '_id',
					as: 'plantilla'
				}
			},
			{
				$unwind: {
					path: '$plantilla',
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$lookup: {
					from: 'campos',
					localField: 'id_plantilla',
					foreignField: 'id_plantilla',
					as: 'campos'
				}
			},
			{
				$lookup: {
					from: 'respuestas',
					localField: '_id',
					foreignField: 'id_formato',
					as: 'respuestas'
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
