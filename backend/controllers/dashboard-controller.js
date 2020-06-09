const historyCollection = require('../models/history-model');
const HttpError = require('../models/http-error');

exports.dashboard = async (req, res, next) => {
	console.log('getting dashboard');
	try {
		const history = await historyCollection.aggregate([
			{
				$facet: {
					creados: [
						{
							$match: {
								accion_formato: 'creó'
							}
						},
						{
							$group: {
								_id: {
									$dateToString: {
										format: '%Y-%m-%d',
										date: '$fecha',
										timezone: '-06:00'
									}
								},
								count: {
									$sum: 1
								}
							}
						}
					],
					modificados: [
						{
							$match: {
								accion_formato: 'modificó'
							}
						},
						{
							$group: {
								_id: {
									$dateToString: {
										format: '%Y-%m-%d',
										date: '$fecha',
										timezone: '-06:00'
									}
								},
								count: {
									$sum: 1
								}
							}
						}
					],
					historial: [
						{
							$match: {
								accion_nna: null
							}
						},
						{
							$limit: 100
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
								from: 'formatos',
								localField: 'id_formato',
								foreignField: '_id',
								as: 'formato'
							}
						},
						{
							$unwind: {
								path: '$formato',
								preserveNullAndEmptyArrays: false
							}
						}
					]
				}
			}
		]);
		res.json(history);
	} catch (error) {
		return next(new HttpError(error, 500));
	}
};
