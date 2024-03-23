const Router = require('express')
const router = new Router()
const receptionOfBooksControllers = require('../controllers/receptionOfBooksControllers')

router.post('/', receptionOfBooksControllers.create)

router.get('/', receptionOfBooksControllers.getAll)
router.get('/:Id', receptionOfBooksControllers.getOne)
// router.de

module.exports= router