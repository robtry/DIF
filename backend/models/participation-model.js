const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participationSchema = new Schema({
	id_formato: { type: Schema.Types.ObjectId, required: true },
	id_usuario: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('participaciones', participationSchema);