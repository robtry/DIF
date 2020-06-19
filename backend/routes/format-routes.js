const express = require('express');
const { check } = require('express-validator');
const formatController = require('../controllers/format-controller');
const answerController = require('../controllers/answer-controller');
const { isAuth } = require('../middlewares/authentication');

const router = express.Router();

// crear
router.post('/', isAuth, formatController.createFormat);

//fill
router.post('/:id', isAuth, answerController.fillAnswers);

//get current regs (number)
router.get('/total/', isAuth, formatController.getTotalRegs);

// getOneFormaat
router.get('/:id', isAuth, formatController.getOneFormat);

// search by name
router.get('/search/:name/:id_nna', isAuth, formatController.getByName);

//get all
router.get(
	'/:type/:id_nna/:page',
	isAuth,
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	formatController.getAllFormatsForNNA
);

router.delete('/:id/:id_usuario', isAuth, formatController.deleteFormat);

module.exports = router;
