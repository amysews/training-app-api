const router = require('express').Router();
const measuresRouter = require('./measuresRouter');
const exercisesRouter = require('./exercisesRouter');
const sessionsRouter = require('./sessionsRouter');
const completedWorkoutsRouter = require('./completedWorkoutsRouter');

router.get('/', (req, res) => {
    return res.status(200).send({'message': 'you have found the api'});
})

router.use('/measures', measuresRouter);
router.use('/exercises', exercisesRouter);
router.use('/sessions', sessionsRouter)
router.use('/completedWorkouts', completedWorkoutsRouter)

module.exports = router;