const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const nnaCollection = require('../models/nna-model');
const userCollection = require('../models/user-model');
const bcrypt = require('bcryptjs');
const { historyCollection } = require('../models/history-model');
const mongoose = require('mongoose');
const path = require('path');
const ObjectId = mongoose.Types.ObjectId;

const finaluploadsPath = require('../config/keys').uploadsPath;

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
			sortMode = { ultima_actualizacion: -1 };
			break;
		case 'actasc':
			sortMode = { ultima_actualizacion: 1 };
			break;
		// case 'adddesc':
		// 	sortMode = { fecha_ingreso: 1 };
		// 	break;
		// case 'addasc':
		// 	sortMode = { fecha_ingreso: -1 };
		// 	break;
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
			},
			{
				$lookup: {
					from: 'formatos',
					localField: '_id',
					foreignField: 'id_nna',
					as: 'formatos'
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

exports.createNNA = async (req, res, next) => {
	console.log('Creating NNA');

	const imagePic = req.files ? req.files.image : undefined;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	if (imagePic) {
		if (
			!(
				imagePic.mimetype === 'image/jpeg' ||
				imagePic.mimetype === 'image/jpg' ||
				imagePic.mimetype === 'image/png'
			) ||
			imagePic.name.indexOf(' ') !== -1
		) {
			return next(new HttpError('The image format or name is wrong', 422));
		}
	}

	const { nombre, app, apm, expediente, sexo, fecha_nacimiento } = req.body;
	const estatus = 'in';

	//console.log(nombre, tipo, username, password);
	const nna = new nnaCollection({
		expediente,
		nombre,
		app,
		apm,
		fecha_nacimiento: new Date(fecha_nacimiento),
		sexo,
		estatus,
		nombre_completo: `${nombre} ${app} ${apm}`
	});

	if (imagePic) {
		const uploadsPath = path.join(path.resolve(finaluploadsPath), nna.id);
		const filepath = path.join(uploadsPath, `main.${imagePic.name.split('.')[1]}`);
		await imagePic.mv(filepath);
		nna.image = filepath;
	}

	nna
		.save()
		.then(async (ans) => {
			try {
				await new historyCollection({
					id_usuario: ObjectId(req.user),
					accion_nna: 'agregó',
					id_nna: ans._id
				}).save();
			} catch (er) {
			} finally {
				return res.status(201).json({ message: 'complete' });
			}
		})
		.catch((err) => {
			console.log('Error creating nna:', err);
			return next(new HttpError(err.errmsg, 422));
		});
};

exports.updateNNA = async (req, res, next) => {
	console.log('Updating NNA...', req.params.id);

	const imagePic = req.files ? req.files.image : undefined;
	let id;

	try {
		id = ObjectId(req.params.id);
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}
	if (imagePic) {
		if (
			!(
				imagePic.mimetype === 'image/jpeg' ||
				imagePic.mimetype === 'image/jpg' ||
				imagePic.mimetype === 'image/png'
			) ||
			imagePic.name.indexOf(' ') !== -1
		) {
			return next(new HttpError('The image format or name is wrong', 422));
		}
	}

	const { nombre, app, apm, expediente, sexo, fecha_nacimiento } = req.body;

	let filepath;
	if (imagePic) {
		const uploadsPath = path.join(path.resolve(finaluploadsPath), req.params.id);
		filepath = path.join(uploadsPath, `main.${imagePic.name.split('.')[1]}`);
		await imagePic.mv(filepath);
	}

	const nna = await nnaCollection.findById(id);

	try {
		await nna.updateOne({
			$set: {
				nombre,
				app,
				apm,
				expediente,
				sexo,
				fecha_nacimiento,
				image: imagePic ? filepath : nna.image,
				nombre_completo: `${nombre} ${app} ${apm}`
			}
		});
		res.json({ message: 'ok' });
	} catch (err) {
		return next(new HttpError(err, 500));
	}
	await new historyCollection({
		id_usuario: ObjectId(req.user),
		accion_nna: 'actualizó',
		id_nna: nna._id
	}).save();
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

exports.deleteNNA = async (req, res, next) => {
	console.log('Delete NNa', req.params.id);

	try {
		const nna = await nnaCollection.findById(ObjectId(req.params.id));
		await nna.remove();
		res.json({ message: 'complete' });
	} catch (err) {
		return next(new HttpError(err, 500));
	}
	await new historyCollection({
		id_usuario: ObjectId(req.user),
		accion_nna: 'eliminó'
	}).save();
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
					nombre_completo: {
						$regex: '(?i)' + name
					}
				}
			},
			{
				$lookup: {
					from: 'formatos',
					localField: '_id',
					foreignField: 'id_nna',
					as: 'formatos'
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

exports.changeStatus = (req, res, next) => {
	console.log('Changing status', req.params.id);
	let id;
	try {
		id = ObjectId(req.params.id);
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}
	const { estatus } = req.body;
	nnaCollection
		.updateOne({ _id: id }, { $set: { estatus } })
		.then(async (ans) => {
			try {
				await new historyCollection({
					id_usuario: ObjectId(req.body.id_usuario),
					accion_nna: 'actualizó',
					id_nna: ans._id
				}).save();
			} catch (er) {
			} finally {
				return res.json({ message: 'complete' });
			}
		})
		.catch(() => {
			return next(new HttpError(err, 404));
		});
};

exports.updateNNAExtended = async (req, res, next) => {
	console.log('update nna extended');
	const { username, password } = req.body;
	try {
		const user = await userCollection.findOne({ username });
		if (!user) {
			return next(new HttpError('Error with auth', 422));
		}
		try {
			const passwordComparition = bcrypt.compareSync(password, user.password);
			if (passwordComparition) {
				return this.updateNNA(req, res, next);
			}
			return next(new HttpError('Error with auth', 422));
		} catch (_) {
			return next(new HttpError('Server error', 500));
		}
	} catch (_) {
		return next(new HttpError('Server error', 500));
	}
};
