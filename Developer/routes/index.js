const express = require('express');
const apiRoute = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');
const router = express.Router();

router.use('/', homeRoutes);
router.use('/api', apiRoute);

module.exports = router