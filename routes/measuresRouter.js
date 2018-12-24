const router = require('express').Router()

const {getAll, create, getOne, update, remove} = require('../controllers/measure')

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;