const HttpError = require('../models/http-error');
const answerCollection = require('../models/answer-model');
const { historyCollection } = require('../models/history-model');
const participationCollection = require('../models/participation-model');
const formatCollection = require('../models/format-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');

const finaluploadsPath = process.env.UPLOADS_PATH;

exports.fillAnswers = async (req, res, next) => {
	console.log('Entrando al fill ans', req.params.id);
	let { id } = req.params;
	let id_usuario;
	try {
		id = ObjectId(id);
		id_usuario = ObjectId(req.body.id_usuario);
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	delete req.body.id_usuario;

	//console.log(req.body);
	//console.log(req.files);

	let answers = [];
	Object.keys(req.body).forEach(function(k) {
		//console.log(k + ' - ' + obj[k])
		try {
			answers.push({ id_campo: ObjectId(k), respuesta: JSON.parse(req.body[k]), id_formato: id });
		} catch (error) {
			answers.push({ id_campo: ObjectId(k), respuesta: req.body[k], id_formato: id });
		}
	});

	if (req.files) {
		let format;
		try {
			format = await formatCollection.findById(id);
		} catch (err) {
			return next(new HttpError(err, 500));
		}

		const uploadsPath = path.join(path.resolve(finaluploadsPath), format.id_nna.toString(), format.id);
		let filepath;
		const filekeys = Object.keys(req.files);
		for (let i = 0; i < filekeys.length; i++) {
			filepath = path.join(uploadsPath, `${filekeys[i]}.${req.files[filekeys[i]].name.split('.')[1]}`);
			await req.files[filekeys[i]].mv(filepath);
			answers.push({ id_campo: ObjectId(filekeys[i]), respuesta: filepath, id_formato: id });
		}
	}

	//console.log(answers);
	//return;

	answers.forEach(async (v) => {
		await answerCollection.updateOne(
			{ id_formato: v.id_formato, id_campo: v.id_campo },
			{
				$set: v
			},
			{ upsert: true },
			(err) => {
				if (err) {
					console.log('update field in template', err);
					return next(new HttpError(err, 500));
				}
			}
		);
	});

	await participationCollection.updateOne(
		{ id_usuario, id_formato: id },
		{ $set: { id_usuario, id_formato: id } },
		{ upsert: true }
	);
	await new historyCollection({
		id_formato: id,
		id_usuario,
		accion_formato: 'modificó'
	}).save();

	res.json({ message: 'complete' });
};
