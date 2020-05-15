const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ansSchema = new Schema({
	id_formato: { type: Schema.Types.ObjectId, required: true },
	id_campo: { type: Schema.Types.ObjectId, required: true },
	respuesta: {}
});

module.exports = mongoose.model('respuestas', ansSchema);
