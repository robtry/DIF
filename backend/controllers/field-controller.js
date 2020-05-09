const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const templateCollection = require('../models/template-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.addFieldToTemplate = (req, res, next) => {
	console.log('Adding field to template', req.params.id);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	try {
		console.log(ObjectId(req.params.id));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	const {
		nombre,
		tipo,
		index,
		//abierta
		pista,
		placeholder,
		tipo_campo,
		// cerrada, multi
		opciones,
		// constante
		fuente,
		//archivo
		tipo_archivo
	} = req.body;

	//console.log(req.body);
	let field;
	switch (tipo) {
		case 'abierta':
			if (pista === undefined || placeholder === undefined || tipo_campo === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			field = { pista: pista.trim(), placeholder, tipo_campo };
			break;
		case 'cerrada':
		case 'multi':
			if (pista === undefined || opciones === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			let optionObj = [];
			opciones.split('\n').forEach((v) => optionObj.push({ valor: v }));
			field = { pista: pista.trim(), opciones: optionObj };
			break;
		case 'constante':
			if (fuente === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			field = { fuente };
			break;
		case 'archivo':
			if (tipo_archivo === undefined || pista === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			field = { tipo_archivo, pista: pista.trim() };
			break;
		case 'separador':
			// solo valida nombre, pero ya se válida en el router, esta aqui para no caer en el default
			break;
		default:
			return next(new HttpError('Invalid request, check your data', 422));
	}

	//return res.json({ message: 'complete' }); //for development

	templateCollection.updateOne(
		{ _id: ObjectId(req.params.id) },
		{
			$push: {
				campos: {
					nombre,
					tipo,
					index,
					...field
				}
			}
		},
		(err) => {
			if (err) {
				console.log('template add field', err);
				return next(new HttpError(err, 500));
			}
			res.json({ message: 'complete' });
		}
	);
};

exports.deleteField = (req, res, next) => {
	console.log('Deleting field from template', req.params.id_template, req.params.id_field);

	try {
		console.log(ObjectId(req.params.id_template));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	try {
		console.log(ObjectId(req.params.id_field));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	templateCollection.updateOne(
		{ _id: ObjectId(req.params.id_template) },
		{
			$pull: { campos: { _id: ObjectId(req.params.id_field) } }
		},
		(err) => {
			if (err) {
				console.log('template delete field', err);
				return next(new HttpError(err, 500));
			}
			res.json({ message: 'complete' });
		}
	);
};

exports.updateField = (req, res, next) => {
	console.log('Updating field to template');

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Invalid request, check your data', 422));
	}

	try {
		console.log(ObjectId(req.params.id_template));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	try {
		console.log(ObjectId(req.params.id_field));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	const {
		nombre,
		tipo,
		index,
		//abierta
		pista,
		placeholder,
		tipo_campo,
		// cerrada, multi
		opciones,
		// constante
		fuente,
		//archivo
		tipo_archivo
	} = req.body;

	//console.log(req.body);
	let field;
	switch (tipo) {
		case 'abierta':
			if (pista === undefined || placeholder === undefined || tipo_campo === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			field = { pista: pista.trim(), placeholder, tipo_campo };
			break;
		case 'cerrada':
		case 'multi':
			if (pista === undefined || opciones === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			let optionObj = [];
			opciones.split('\n').forEach((v) => optionObj.push({ valor: v }));
			field = { pista: pista.trim(), opciones: optionObj };
			break;
		case 'constante':
			if (fuente === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			field = { fuente };
			break;
		case 'archivo':
			if (tipo_archivo === undefined || pista === undefined) {
				return next(new HttpError('Invalid request, check your data', 422));
			}
			field = { tipo_archivo, pista: pista.trim() };
			break;
		case 'separador':
			// solo valida nombre, pero ya se válida en el router, esta aqui para no caer en el default
			break;
		default:
			return next(new HttpError('Invalid request, check your data', 422));
	}

	templateCollection.updateOne(
		{ _id: ObjectId(req.params.id_template) },
		{
			$set: {
				'campos.$[el]': {
					nombre,
					tipo,
					index,
					...field
				}
			}
		},
		{
			arrayFilters: [ { 'el._id': ObjectId(req.params.id_field) } ]
		},
		(err) => {
			if (err) {
				console.log('update field in template', err);
				return next(new HttpError(err, 500));
			}
			res.json({ message: 'complete' });
		}
	);
};
