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

module.exports = mongoose.model('historial', historyModel);
