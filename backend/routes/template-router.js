const express = require('express');
const { check } = require('express-validator');
//user
const templateController = require('../controllers/template-controller');
const fieldController = require('../controllers/field-controller');
const { REXEG_USER_TYPES } = require('../models/userTypes');
const { isAuth, isAdmin } = require('../middlewares/authentication');

const router = express.Router();

//fields
router.delete('/fields/:id_template/:id_field', isAdmin, fieldController.deleteField);

//update
router.post(
	'/fields/:id_template/:id_field',
	isAdmin,
	[
		check('nombre').notEmpty().trim(),
		check('index').notEmpty().isNumeric(),
		check('tipo').notEmpty().matches(/^(abierta|cerrada|multi|constante|archivo|separador)$/)
	],
	fieldController.updateField
);

// add
router.post(
	'/fields/:id',
	isAdmin,
	[
		check('nombre').notEmpty().trim(),
		check('index').notEmpty().isNumeric(),
		check('tipo').notEmpty().matches(/^(abierta|cerrada|multi|constante|archivo|separador)$/)
	],
	fieldController.addFieldToTemplate
);

//get current regs (number)
router.get('/total/', isAuth, templateController.getTotalRegs);

// search by name
router.get('/search/:name', isAuth, templateController.getByName);

//get all
router.get(
	'/:type/:page',
	isAuth,
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	templateController.getAllTemplates
);

// create new template
router.post(
	'/',
	isAdmin,
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('descripcion').notEmpty().isLength({ max: 200 })
	],
	templateController.createTemplate
);

//update template
router.post(
	'/:id',
	isAdmin,
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('descripcion').notEmpty().isLength({ max: 200 })
	],
	templateController.updateTemplate
);

router.delete('/:id', isAdmin, templateController.deleteTemplate);

router.get('/:id', isAdmin, templateController.getTemplate);

module.exports = router;
