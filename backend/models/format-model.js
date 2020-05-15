const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatSchema = new Schema({
	id_nna: { type: Schema.Types.ObjectId, required: true },
	id_plantilla: { type: Schema.Types.ObjectId, required: true, ref: 'template' },
	fecha_creacion: { type: Date, required: true },
	ultima_actualizacion: { type: Date, required: true },
});


module.exports = mongoose.model('formatos', formatSchema);
