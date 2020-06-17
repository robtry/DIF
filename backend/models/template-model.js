const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fieldCollection = require('./field-model');
const formatCollection = require('./format-model');

const templateSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	tipo: { type: String, required: true, enum: [ 'medico', 'juridico', 'tsocial', 'psicologo', 'pedagogo' ] }
});

templateSchema.pre('remove', async function(next) {
	try {
		const formats = await formatCollection.find({ id_plantilla: this._id });
		formats.forEach((f) => f.remove());
	} catch (_) {}
	await fieldCollection.deleteMany({ id_plantilla: this._id }).exec();
	next();
});

module.exports = mongoose.model('plantillas', templateSchema);
