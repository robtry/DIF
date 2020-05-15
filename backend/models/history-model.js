const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyModel = new Schema({
	id_formato: { type: Schema.Types.ObjectId, required: true },
	id_usuario: { type: Schema.Types.ObjectId, required: true },
	accion: { type: String, required: true, enum: [ 'crear', 'modificar' ] },
});

module.exports = mongoose.model('historial', historyModel);