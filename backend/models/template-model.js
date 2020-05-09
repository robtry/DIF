const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	tipo: { type: String, required: true, enum: [ 'medico', 'juridico', 'tsocial', 'psicologo', 'pedagogo' ] },
	campos: [
		{
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
		}
	]
});

module.exports = mongoose.model('templates', templateSchema);
