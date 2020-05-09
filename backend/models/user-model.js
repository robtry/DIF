const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	nombre: { type: String, required: true },
	tipo: { type: String, required: true, enum: [ 'admin', 'medico', 'juridico', 'tsocial', 'psicologo', 'pedagogo' ] },
	sexo: { type: String, required: true, enum: [ 'm', 'h' ] },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	image: { type: String }
	//token:
});

module.exports = mongoose.model('usuarios', userSchema);
