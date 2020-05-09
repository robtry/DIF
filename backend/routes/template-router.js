const express = require('express');
const { check } = require('express-validator');
//user
const templateController = require('../controllers/template-controller');
const fieldController = require('../controllers/field-controller');
const { REXEG_USER_TYPES } = require('../models/userTypes');

const router = express.Router();

//fields
router.delete('/fields/:id_template/:id_field', fieldController.deleteField);

//update
router.post(
	'/fields/:id_template/:id_field',
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
	[
		check('nombre').notEmpty().trim(),
		check('index').notEmpty().isNumeric(),
		check('tipo').notEmpty().matches(/^(abierta|cerrada|multi|constante|archivo|separador)$/)
	],
	fieldController.addFieldToTemplate
);

//get current regs (number)
router.get('/total/', templateController.getTotalRegs);

// search by name
router.get('/search/:name', templateController.getByName);

//get all
router.get(
	'/:type/:page',
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	templateController.getAllTemplates
);

// create new template
router.post(
	'/',
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
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('descripcion').notEmpty().isLength({ max: 200 })
	],
	templateController.updateTemplate
);

router.delete('/:id', templateController.deleteTemplate);

router.get('/:id', templateController.getTemplate);

module.exports = router;
