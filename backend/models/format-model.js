const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ansCollection = require('./answer-model');
const participationCollection = require('./participation-model')
const historyCollection = require('./history-model')

const formatSchema = new Schema({
	id_nna: { type: Schema.Types.ObjectId, required: true },
	id_plantilla: { type: Schema.Types.ObjectId, required: true, ref: 'template' },
	// fecha_creacion: { type: Date, required: true },
	// ultima_actualizacion: { type: Date, required: true },
}, { timestamps: { createdAt: 'fecha_creacion', updatedAt: 'ultima_actualizacion' } });

formatSchema.pre('remove', function(next) {
	ansCollection.deleteMany({id_formato: this._id}).exec();
	participationCollection.deleteMany({id_formato: this._id}).exec();
	historyCollection.deleteMany({id_formato: this._id}).exec();
	next();
});


module.exports = mongoose.model('formatos', formatSchema);
