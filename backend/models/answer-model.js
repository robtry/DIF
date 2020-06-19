const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

const finaluploadsPath = require('../config/keys').uploadsPath;

const ansSchema = new Schema({
	id_formato: { type: Schema.Types.ObjectId, required: true },
	id_campo: { type: Schema.Types.ObjectId, required: true },
	respuesta: {}
});

ansSchema.pre('remove', async function(next) {
	if (this.respuesta.includes(finaluploadsPath)) {
		try {
			fs.unlinkSync(this.respuesta);
		} catch (_) {}
	}
	next();
});

module.exports = mongoose.model('respuestas', ansSchema);
