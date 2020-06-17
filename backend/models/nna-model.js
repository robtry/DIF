const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const formatCollection = require('./format-model');
const { historyCollection } = require('./history-model');
const fs = require('fs');
const path = require('path');

const finaluploadsPath = process.env.UPLOADS_PATH;

const nnaSchema = new Schema(
	{
		expediente: { type: String, required: true },
		nombre: { type: String, required: true },
		app: { type: String, required: true },
		apm: { type: String, required: true },
		nombre_completo: { type: String, required: true },
		fecha_nacimiento: { type: Date, required: true },
		sexo: { type: String, required: true, enum: [ 'm', 'h' ] },
		estatus: { type: String, required: true, enum: [ 'in', 'out' ] },
		image: { type: String },
		//fecha_egreso: { type: Date },
		ultima_actividad: { type: Date }
	},
	{ timestamps: { createdAt: 'fecha_creacion', updatedAt: 'ultima_actualizacion' } }
);

nnaSchema.pre('remove', async function(next) {
	try {
		fs.rmdirSync(path.join(path.resolve(finaluploadsPath), this.id), {
			recursive: true
		});
	} catch (_) {}
	try {
		const formats = await formatCollection.find({ id_nna: this._id });
		formats.forEach((f) => f.remove());
	} catch (_) {}
	await historyCollection.deleteMany({ id_nna: this._id }).exec();
	next();
});

module.exports = mongoose.model('nnas', nnaSchema);
