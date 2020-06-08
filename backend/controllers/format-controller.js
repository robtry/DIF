const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const formatCollection = require('../models/format-model');
const historyCollection = require('../models/history-model');
const participationCollection = require('../models/participation-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createFormat = async (req, res, next) => {
	console.log('Creating format');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	let { id_plantilla, id_nna, id_user } = req.body;

	try {
		id_nna = ObjectId(id_nna);
		id_plantilla = ObjectId(id_plantilla);
		id_user = ObjectId(id_user);
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	try {
		const formato = await new formatCollection({
			id_nna,
			id_plantilla
		}).save();
		await new participationCollection({ id_formato: formato._id, id_usuario: id_user }).save();
		await new historyCollection({
			id_formato: formato._id,
			id_usuario: id_user,
			accion: 'creó'
		}).save();
		return res.status(201).json({ message: 'complete' });
	} catch (err) {
		console.log('Error creating format:', err);
		return next(new HttpError(err.errmsg, 422));
	}
};

exports.getAllFormatsForNNA = (req, res, next) => {
	console.log('Getting All Formats for NNA');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { type, page, id_nna } = req.params;

	try {
		//console.log(ObjectId(id_nna));
		ObjectId(id_nna);
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	formatCollection
		.aggregate([
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
				$skip: (page - 1) * 30
			},
			{
				$limit: 30
			},
			{
				$match: {
					'plantilla.tipo': {
						$regex: type === 'all' ? '.*' : type
					},
					id_nna: ObjectId(id_nna)
				}
			},
			{
				$lookup: {
					from: 'campos',
					localField: 'id_plantilla',
					foreignField: 'id_plantilla',
					as: 'campo'
				}
			},
			{
				$unwind: {
					path: '$campo',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$lookup: {
					from: 'respuestas',
					let: { id: '$_id', campo: '$campo' },
					pipeline: [
						{ $match: { $expr: { $eq: [ '$id_formato', '$$id' ] } } },
						{ $match: { $expr: { $eq: [ '$id_campo', '$$campo._id' ] } } }
					],
					as: 'respuesta'
				}
			},
			{
				$unwind: {
					path: '$respuesta',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$addFields: {
					'campo.respuesta': '$respuesta.respuesta'
				}
			},
			{
				$group: {
					_id: {
						_id: '$_id',
						fecha_creacion: '$fecha_creacion',
						ultima_actualizacion: '$ultima_actualizacion',
						plantilla: '$plantilla'
					},
					campos: {
						$push: '$campo'
					}
				}
			},
			{
				$lookup: {
					from: 'participaciones',
					localField: '_id._id',
					foreignField: 'id_formato',
					as: 'participacionestemp'
				}
			},
			{
				$lookup: {
					from: 'usuarios',
					localField: 'participacionestemp.id_usuario',
					foreignField: '_id',
					as: 'participaciones'
				}
			},
			{
				$project: {
					participacionestemp: 0
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
			},
			{
				$lookup: {
					from: 'campos',
					localField: 'id_plantilla',
					foreignField: 'id_plantilla',
					as: 'campo'
				}
			},
			{
				$unwind: {
					path: '$campo',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$lookup: {
					from: 'respuestas',
					let: { id: '$_id', campo: '$campo' },
					pipeline: [
						{ $match: { $expr: { $eq: [ '$id_formato', '$$id' ] } } },
						{ $match: { $expr: { $eq: [ '$id_campo', '$$campo._id' ] } } }
					],
					as: 'respuesta'
				}
			},
			{
				$unwind: {
					path: '$respuesta',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$addFields: {
					'campo.respuesta': '$respuesta.respuesta'
				}
			},
			{
				$group: {
					_id: {
						_id: '$_id',
						fecha_creacion: '$fecha_creacion',
						ultima_actualizacion: '$ultima_actualizacion',
						plantilla: '$plantilla'
					},
					campos: {
						$push: '$campo'
					}
				}
			},
			{
				$lookup: {
					from: 'participaciones',
					localField: '_id._id',
					foreignField: 'id_formato',
					as: 'participacionestemp'
				}
			},
			{
				$lookup: {
					from: 'usuarios',
					localField: 'participacionestemp.id_usuario',
					foreignField: '_id',
					as: 'participaciones'
				}
			},
			{
				$project: {
					participacionestemp: 0
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
					as: 'campo'
				}
			},
			{
				$unwind: {
					path: '$campo',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$lookup: {
					from: 'respuestas',
					let: { id: '$_id', campo: '$campo' },
					pipeline: [
						{ $match: { $expr: { $eq: [ '$id_formato', '$$id' ] } } },
						{ $match: { $expr: { $eq: [ '$id_campo', '$$campo._id' ] } } }
					],
					as: 'respuesta'
				}
			},
			{
				$unwind: {
					path: '$respuesta',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$addFields: {
					'campo.respuesta': '$respuesta.respuesta'
				}
			},
			{
				$group: {
					_id: {
						_id: '$_id',
						fecha_creacion: '$fecha_creacion',
						ultima_actualizacion: '$ultima_actualizacion',
						plantilla: '$plantilla',
						id_nna: '$id_nna'
					},
					campos: {
						$push: '$campo'
					}
				}
			},
			{
				$lookup: {
					from: 'nnas',
					localField: '_id.id_nna',
					foreignField: '_id',
					as: 'nna'
				}
			},
			{
				$unwind: {
					path: '$nna',
					preserveNullAndEmptyArrays: false
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
