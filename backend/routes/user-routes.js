const express = require('express');
const { check } = require('express-validator');
//user
const userController = require('../controllers/user-controller');
const { REXEG_USER_TYPES } = require('../models/userTypes');
const { isAuth, isAdmin } = require('../middlewares/authentication');

const router = express.Router();

//get current regs (number)
router.get('/total/', isAdmin, userController.getTotalRegs);

// get last 6 months movements user
router.get('/history/total/', isAuth, userController.getTotalRegsHistory);
router.get('/history/:id/:page', isAuth, userController.getHistoryUser);

// get admins
router.get('/admins', isAuth, userController.getAdmins);

// login
router.post(
	'/login',
	[ check('username').notEmpty().trim(), check('password').notEmpty().trim().isLength({ min: 6, max: 30 }) ],
	userController.login
);

// reset password
router.post('/reset/:id', isAdmin, userController.resetPassword);

// update password
router.post(
	'/password/:id',
	isAdmin,
	[
		check('current_password').notEmpty().isLength({ min: 6, max: 30 }),
		check('new_password').notEmpty().isLength({ min: 6, max: 30 })
	],
	userController.updateUserPassword
);

// search by name
router.get('/search/:name', isAdmin, userController.getByName);

//get all
router.get(
	'/:type/:page',
	isAdmin,
	[ check('page').notEmpty().isInt(), check('type').notEmpty().isString() ],
	userController.getAllUsers
);

// create new user
router.post(
	'/',
	isAdmin,
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
	isAdmin,
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('username').notEmpty().trim().isLength({ min: 3, max: 30 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i')
	],
	userController.updateUser
);

router.delete('/:id', isAdmin, userController.deleteUser);

//router.get('/:id', userController.getUserById);

module.exports = router;
