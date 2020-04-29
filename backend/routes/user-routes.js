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

//get all
router.get('/:type/:page', [ check('page').isInt(), check('type').isString() ], userController.getAllUsers);
// create new user
router.post(
	'/',
	[
		check('nombre').notEmpty().trim().isLength({ min: 3, max: 100 }),
		check('tipo').notEmpty().matches(REXEG_USER_TYPES, 'i'),
		check('username').notEmpty().trim().isLength({ min: 3, max: 30 }),
		check('sexo').notEmpty().matches(/^(m|h)$/, 'i')
	],
	userController.createUser
);
router.post('/login', userController.login);
router.patch('/password/:id', userController.updateUserPassword);

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
// search by name
router.post('/:name', userController.getByName);
// get total regs

module.exports = router;
