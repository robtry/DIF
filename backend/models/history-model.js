const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyModel = new Schema({
	id_usuario: { type: Schema.Types.ObjectId, required: true },

	//formato ref
	id_formato: { type: Schema.Types.ObjectId },
	accion_formato: { type: String, enum: [ 'creó', 'modificó', 'eliminó' ] },

	//nna ref
	accion_nna: { type: String, enum: [ 'agregó', 'actualizó', 'eliminó' ] },
	id_nna: { type: Schema.Types.ObjectId },
	fecha: { type: Date, default: Date.now }
});

const historyCollection = mongoose.model('historial', historyModel);

module.exports = {
	historyCollection,
	historyDashboard: async () => {
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
										timezone: '-05:00'
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
										timezone: '-05:00'
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
						{ $limit: 100 },
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
						},
						{
							$sort: {
								fecha: -1
							}
						}
					]
				}
			}
		]);
		return history;
	}
};
