const router = require('express').Router()

const {getAll, create, getOne, update, remove} = require('../controllers/measures')

// router.get('/', (req, res) => {
//     return res.status(200).send({'message': 'you have found measures'});
// })

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;