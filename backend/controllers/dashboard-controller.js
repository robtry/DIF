const { historyDashboard } = require('../models/history-model');
const HttpError = require('../models/http-error');

exports.dashboard = async (req, res, next) => {
	console.log('Getting dashboard');
	try {
		const history = await historyDashboard();
		res.json(history);
	} catch (error) {
		return next(new HttpError(error, 500));
	}
};
