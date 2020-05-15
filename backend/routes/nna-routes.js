const express = require('express');
const { check } = require('express-validator');
//nna
const nnaController = require('../controllers/nna-controller');

const router = express.Router();

//get current regs (number)
router.get('/total/', nnaController.getTotalRegs);

// search by name
router.get('/search/:name', nnaController.getByName);

//get all
router.get(
	'/:sort/:page',
	[ check('page').notEmpty().isInt(), check('sort').notEmpty().isString() ],
	nnaController.getAllNNAs
);
// create new nna
router.post(
	'/',
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

// //update nna
router.post(
	'/:id',
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

router.delete('/:id', nnaController.deleteNNA);

router.get('/:id', nnaController.getNNA);

module.exports = router;
