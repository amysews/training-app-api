const router = require('express').Router();
const measuresRouter = require('./measuresRouter');
// const peopleRouter = require('./people');
// const religionRouter = require('./religions');

router.get('/', (req, res) => {
    return res.status(200).send({'message': 'you have found the api'});
})
router.use('/measures', measuresRouter);
// router.use('/people', peopleRouter);
// router.use('/religions', religionRouter)

module.exports = router;