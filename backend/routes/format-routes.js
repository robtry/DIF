const express = require('express');
const { check } = require('express-validator');
const formatController = require('../controllers/format-controller');
const answerController = require('../controllers/answer-controller');
const { isRegistered } = require('../middlewares/authentication');

const router = express.Router();

// crear
router.post('/', isRegistered, formatController.createFormat);

//fill
router.post('/:id', isRegistered, answerController.fillAnswers);

//get current regs (number)
router.get('/total/', isRegistered, formatController.getTotalRegs);

// getOneFormaat
router.get('/:id', isRegistered, formatController.getOneFormat);

// search by name
router.get('/search/:name/:id_nna', isRegistered, formatController.getByName);

//get all
router.get(
	'/:type/:id_nna/:page',
	isRegistered,
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	formatController.getAllFormatsForNNA
);

router.delete('/:id/:id_usuario', isRegistered, formatController.deleteFormat);

module.exports = router;
