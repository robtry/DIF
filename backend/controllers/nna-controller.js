const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const nnaCollection = require('../models/nna-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAllNNAs = (req, res, next) => {
	console.log('Getting all nnas!');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { sort, page } = req.params;

	console.log('sorting:', sort);
	let sortMode;
	switch (sort) {
		case 'namedesc':
			sortMode = { nombre: 1 };
			break;
		case 'nameasc':
			sortMode = { nombre: -1 };
			break;
		case 'actdesc':
			sortMode = { ultima_actividad: 1 };
			break;
		case 'actasc':
			sortMode = { ultima_actividad: -1 };
			break;
		case 'adddesc':
			sortMode = { fecha_ingreso: 1 };
			break;
		case 'addasc':
			sortMode = { fecha_ingreso: -1 };
			break;
		default:
			return next(new HttpError('Invalid request, check your data', 422));
	}

	nnaCollection
		.aggregate([
			{
				$sort: sortMode
			},
			{
				$skip: (page - 1) * 30
			},
			{
				$limit: 30
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

exports.createNNA = (req, res, next) => {
	console.log('Creating NNA');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, app, apm, expediente, sexo, fecha_nacimiento } = req.body;
	const fecha_ingreso = new Date();
	const estatus = 'in';

	//console.log(nombre, tipo, username, password);
	new nnaCollection({
		expediente,
		nombre,
		app,
		apm,
		fecha_nacimiento: new Date(fecha_nacimiento),
		sexo,
		fecha_ingreso,
		estatus
	})
		.save()
		.then(
			(/*ans*/) => {
				//console.log('Complete', ans);
				return res.status(201).json({ message: 'complete' });
			}
		)
		.catch((err) => {
			console.log('Error creating nna:', err);
			return next(new HttpError(err.errmsg, 422));
		});
};

exports.updateNNA = (req, res, next) => {
	console.log('Updating NNA...', req.params.id);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	const { nombre, app, apm, expediente, sexo, fecha_nacimiento } = req.body;

	nnaCollection.updateOne(
		{ _id: ObjectId(req.params.id) },
		{
			$set: {
				nombre,
				app,
				apm,
				expediente,
				sexo,
				fecha_nacimiento
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

exports.getTotalRegs = (req, res, next) => {
	console.log('Getting total pages for nna');
	nnaCollection
		.estimatedDocumentCount()
		.then((ans) => {
			//console.log(res);
			res.json(ans);
		})
		.catch((err) => {
			console.log('Getting total pages nna:', err);
			return next(new HttpError('Server error', 500));
		});
};

exports.deleteNNA = (req, res, next) => {
	console.log('Delete NNa', req.params.id);

	nnaCollection.deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
		if (err) {
			return next(new HttpError(err, 500));
		}
	});
	res.json({ message: 'complete' });
};

exports.getByName = (req, res, next) => {
	console.log('Searching by name');
	const { name } = req.params;
	nnaCollection
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

exports.getNNA = (req, res, next) => {
	console.log('Getting NNA', req.params.id);
	try {
		ObjectId(req.params.id);
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	nnaCollection
		.aggregate([
			{
				$match: {
					_id: ObjectId(req.params.id)
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
