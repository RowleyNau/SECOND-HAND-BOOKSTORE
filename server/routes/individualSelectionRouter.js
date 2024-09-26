const Router = require('express')
const router = new Router()
const IndividualSelectionControllers = require('../controllers/individualSelectionControllers')

router.post('/IndividualSelectionAdd',IndividualSelectionControllers.IndividualSelectionAdd)
router.get('/IndividualSelectionGetAll',IndividualSelectionControllers.IndividualSelectionGetAll)
router.get('/IndividualSelectionGetOne',IndividualSelectionControllers.IndividualSelectionGetOne)
router.get('/IndividualSelectionClientsGetAll',IndividualSelectionControllers.IndividualSelectionClientsGetAll)

router.post('/ResultBySelectionOfGoodsAdd',IndividualSelectionControllers.ResultBySelectionOfGoodsAdd)

module.exports= router



// router.post('/AcceptingBooksPhotoAdd',IndividualSelectionControllers.AcceptingBooksPhotoAdd)
// router.post('/BookDel',BookManagementController.BookDel)
// router.post('/BookUpdate',BookManagementController.BookUpdate)
// router.get('/BookSearchGetAll',BookManagementController.BookSearchGetAll)
// router.get('/BookGet',BookManagementController.BookGet)

// const authMiddleware = require('../middleware/authMiddleware')
// router.get('/BookGetOne', BookManagementController.BookGetOne)
// router.get('/BookGet', BookManagementController.BookGet)