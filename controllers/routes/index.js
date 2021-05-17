const router = require('express').Router();

const htmlRoutes = require('./htmlRoutes.js');
const apiRoutes = require('./apiRoutes.js');


router.use('/exercise', htmlRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end()
});

module.exports = router;
