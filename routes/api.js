const router = require('express').Router();
const measuresRouter = require('./measuresRouter');
const exercisesRouter = require('./exercisesRouter');

router.get('/', (req, res) => {
    return res.status(200).send({'message': 'you have found the api'});
})

router.use('/measures', measuresRouter);
router.use('/exercises', exercisesRouter);

module.exports = router;