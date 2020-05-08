const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nnaSchema = new Schema({
	expediente: { type: String, required: true },
	nombre: { type: String, required: true },
	app: { type: String, required: true },
	apm: { type: String, required: true },
	fecha_nacimiento: { type: Date, required: true },
	fecha_ingreso: { type: Date, required: true },
	sexo: { type: String, required: true },
	estatus: { type: String, required: true },
	image: { type: String },
	fecha_egreso: { type: Date },
	ultima_actividad: { type: Date }
	//token:
});

module.exports = mongoose.model('nnas', nnaSchema);
