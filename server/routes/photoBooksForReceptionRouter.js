const Router = require('express')
const router = new Router()
const photoBooksForReceptionControllers = require('../controllers/photoBooksForReceptionControllers')

router.post('/', photoBooksForReceptionControllers.create)

router.get('/', photoBooksForReceptionControllers.getAll)
router.get('/:Id', photoBooksForReceptionControllers.getOne)
// router.de

module.exports= router