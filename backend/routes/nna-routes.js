const express = require('express');
const { check } = require('express-validator');
//nna
const nnaController = require('../controllers/nna-controller');
const { isRegistered } = require('../middlewares/authentication');

const router = express.Router();

//get current regs (number)
router.get('/total/', isRegistered, nnaController.getTotalRegs);

// search by name
router.get('/search/:name', isRegistered, nnaController.getByName);

//get all
router.get(
	'/:sort/:page',
	isRegistered,
	[ check('page').notEmpty().isInt(), check('sort').notEmpty().isString() ],
	nnaController.getAllNNAs
);
// create new nna
router.post(
	'/',
	isRegistered,
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('app').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('apm').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('expediente').notEmpty().trim().isLength({ max: 100 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i'),
		check('fecha_nacimiento').notEmpty().toDate()
	],
	nnaController.createNNA
);

// change estatus
router.post('/status/:id', isRegistered, check('estatus').notEmpty(), nnaController.changeStatus);

// update nna
router.post(
	'/:id',
	isRegistered,
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('app').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('apm').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('expediente').notEmpty().trim().isLength({ max: 100 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i'),
		check('fecha_nacimiento').notEmpty().toDate()
	],
	nnaController.updateNNA
);

router.delete('/:id', isRegistered, nnaController.deleteNNA);

router.get('/:id', isRegistered, nnaController.getNNA);

module.exports = router;
