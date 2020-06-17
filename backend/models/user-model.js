const mongoose = require('mongoose');
const participationCollection = require('./participation-model');
const { historyCollection } = require('./history-model');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	nombre: { type: String, required: true },
	tipo: { type: String, required: true, enum: [ 'admin', 'medico', 'juridico', 'tsocial', 'psicologo', 'pedagogo' ] },
	sexo: { type: String, required: true, enum: [ 'm', 'h' ] },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	image: { type: String }
});

userSchema.pre('remove', async function(next) {
	await participationCollection.deleteMany({ id_usuario: this._id }).exec();
	await historyCollection.deleteMany({ id_usuario: this._id }).exec();
	next();
});

module.exports = mongoose.model('usuarios', userSchema);
