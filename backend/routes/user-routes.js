const express = require('express');
const { check } = require('express-validator');
//user
const userController = require('../controllers/user-controller');
const { REXEG_USER_TYPES } = require('../models/userTypes');

const router = express.Router();

//get current regs (number)
router.get('/total/', userController.getTotalRegs);

// get last 6 months movements user
router.get('/history/total/', userController.getTotalRegsHistory);
router.get('/history/:id/:page', userController.getHistoryUser);

// login
router.post(
	'/login',
	[ check('username').notEmpty().trim(), check('password').notEmpty().trim().isLength({ min: 6 }) ],
	userController.login
);
router.post('/reset/:id', userController.resetPassword )
router.patch('/password/:id', userController.updateUserPassword);

// search by name
router.get('/search/:name', userController.getByName);

//get all
router.get(
	'/:type/:page',
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	userController.getAllUsers
);

// create new user
router.post(
	'/',
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('username').notEmpty().trim().isLength({ min: 6, max: 30 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i')
	],
	userController.createUser
);

//update user
router.post(
	'/:id',
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('username').notEmpty().trim().isLength({ min: 3, max: 30 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i')
	],
	userController.updateUser
);

router.delete('/:id', userController.deleteUser);

router.get('/:id', userController.getUserById);

module.exports = router;
