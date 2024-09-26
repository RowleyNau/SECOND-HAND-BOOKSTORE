const Router = require('express')
const router = new Router()
const AcceptingBooksConrtollers = require('../controllers/acceptingBooksConrtollers')

router.post('/AcceptingBooksAdd',AcceptingBooksConrtollers.AcceptingBooksAdd)
router.post('/AcceptingBooksPhotoAdd',AcceptingBooksConrtollers.AcceptingBooksPhotoAdd)
// router.post('/BookDel',BookManagementController.BookDel)
// router.post('/BookUpdate',BookManagementController.BookUpdate)
router.get('/AcceptingBooksGetAll',AcceptingBooksConrtollers.AcceptingBooksGetAll)
router.get('/AcceptingBooksGetOne',AcceptingBooksConrtollers.AcceptingBooksGetOne)
router.get('/AcceptingBooksClientsGetAll',AcceptingBooksConrtollers.AcceptingBooksClientsGetAll)
router.post('/ResponseToRequestToAcceptBookAdd',AcceptingBooksConrtollers.ResponseToRequestToAcceptBookAdd)
// router.get('/BookSearchGetAll',BookManagementController.BookSearchGetAll)
// router.get('/BookGet',BookManagementController.BookGet)


module.exports= router




// const authMiddleware = require('../middleware/authMiddleware')
// router.get('/BookGetOne', BookManagementController.BookGetOne)
// router.get('/BookGet', BookManagementController.BookGet)