const router = require('express').Router()

// const {getAll, create, getOne, update, remove} = require('../controllers/sessions')
const {getAll, getOne} = require('../controllers/sessions')
const { getOnePlanned} = require('../controllers/exercises')

router.get('/', getAll);
// router.post('/', create);
router.get('/:sessionId', getOne);
router.get('/:sessionId/exercises/:exerciseId', getOnePlanned)
// router.put('/:id', update);
// router.delete('/:id', remove);

module.exports = router;