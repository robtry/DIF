const express = require('express');
const { check } = require('express-validator');
const formatController = require('../controllers/format-controller');
const answerController = require('../controllers/answer-controller');
//const { REXEG_USER_TYPES } = require('../models/userTypes');

const router = express.Router();

// crear
router.post('/', formatController.createFormat);

//fill
router.post('/:id', answerController.fillAnswers);

//get current regs (number)
router.get('/total/', formatController.getTotalRegs);

// getOneFormaat
router.get('/:id', formatController.getOneFormat);

// search by name
router.get('/search/:name/:id_nna', formatController.getByName);

//get all
router.get(
	'/:type/:id_nna/:page',
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	formatController.getAllFormatsForNNA
);

module.exports = router;
