const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');
const { isAuth } = require('../middlewares/authentication');

// crear
router.get('/', isAuth, dashboardController.dashboard);

module.exports = router;
