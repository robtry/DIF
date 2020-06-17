const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');
const { isRegistered } = require('../middlewares/authentication');

// crear
router.get('/', isRegistered, dashboardController.dashboard);

module.exports = router;
