const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	tipo: { type: String, required: true, enum: [ 'medico', 'juridico', 'tsocial', 'psicologo', 'pedagogo' ] },
});

module.exports = mongoose.model('plantillas', templateSchema);
