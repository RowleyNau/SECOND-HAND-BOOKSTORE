const Router = require('express')
const router = new Router()
const BookManagementController = require('../controllers/bookManagementControllers')

router.post('/BookAdd',BookManagementController.BookAdd)
router.post('/BookDel',BookManagementController.BookDel)
router.post('/BookUpdate',BookManagementController.BookUpdate)
router.get('/BookGetAll',BookManagementController.BookGetAll)
router.get('/BookSearchGetAll',BookManagementController.BookSearchGetAll)
router.get('/BookGet',BookManagementController.BookGet)
router.get('/BookCharacteristicsGetAll',BookManagementController.BookCharacteristicsGetAll)


module.exports= router




// const authMiddleware = require('../middleware/authMiddleware')
// router.get('/BookGetOne', BookManagementController.BookGetOne)
// router.get('/BookGet', BookManagementController.BookGet)