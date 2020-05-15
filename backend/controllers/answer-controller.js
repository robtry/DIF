const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const answerCollection = require('../models/answer-model');
const historyCollection = require('../models/history-model');
const paticipationCollection = require('../models/participation-model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.fillAnswers = (req, res, next) => {
	console.log('Entrando al fill ans', req.params.id);
	const { id } = req.params;
	console.log(id);
	try {
		console.log(ObjectId(id));
	} catch (_) {
		return next(new HttpError('Invalid id', 404));
	}

	//console.log(req.body);
	let answers = [];
	Object.keys(req.body).forEach(function(k) {
		//console.log(k + ' - ' + obj[k])
		answers.push({ id_campo: ObjectId(k), respuesta: req.body[k], id_formato: ObjectId(id) });
	});

	//console.log(answers);

	answers.forEach((v) => {
		answerCollection.updateOne(
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
		res.json({ message: 'complete' });
};
