const express = require('express');
const { check } = require('express-validator');
//nna
const nnaController = require('../controllers/nna-controller');
const { isAuth } = require('../middlewares/authentication');

const router = express.Router();

//get current regs (number)
router.get('/total/', isAuth, nnaController.getTotalRegs);

// search by name
router.get('/search/:name', isAuth, nnaController.getByName);

//get all
router.get(
	'/:sort/:page',
	isAuth,
	[ check('page').notEmpty().isInt(), check('sort').notEmpty().isString() ],
	nnaController.getAllNNAs
);
// create new nna
router.post(
	'/',
	isAuth,
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
router.post('/status/:id', isAuth, check('estatus').notEmpty(), nnaController.changeStatus);

// update nna
router.post(
	'/:id',
	isAuth,
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

// update nna with normal user
router.post(
	'/:id/withauth',
	isAuth,
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('app').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('apm').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('expediente').notEmpty().trim().isLength({ max: 100 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i'),
		check('fecha_nacimiento').notEmpty().toDate()
	],
	nnaController.updateNNAExtended
);

router.delete('/:id', isAuth, nnaController.deleteNNA);

router.get('/:id', isAuth, nnaController.getNNA);

module.exports = router;
