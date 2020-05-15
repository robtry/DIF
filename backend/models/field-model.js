const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
	id_plantilla: { type: Schema.Types.ObjectId, required: true },
	tipo: {
		type: String,
		enum: [ 'abierta', 'cerrada', 'multi', 'constante', 'archivo', 'separador' ],
		required: true
	},
	nombre: { type: String, required: true },
	index: { type: Number, required: true },
	// abierta
	placeholder: { type: String },
	//abierta
	tipo_campo: { type: String, enum: [ 'int', 'float', 'char', 'varchar', 'date', 'datetime' ] },
	// abierta, cerrada, multi, archivo
	pista: { type: String },
	// cerrada o multi
	opciones: {
		type: [
			{
				valor: { type: String }
			}
		],
		default: undefined
	},
	//constante
	fuente: { type: String },
	//archivo
	tipo_archivo: { type: String }
});

module.exports = mongoose.model('campos', fieldSchema);
