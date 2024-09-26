const Router = require('express')
const router = new Router()
const PurchaseConrtollers = require('../controllers/purchaseControllers.js')

router.post('/shoppingcartAdd',PurchaseConrtollers.ShoppingcartAdd)
// router.post('/BookDel',BookManagementController.BookDel)
// router.post('/BookUpdate',BookManagementController.BookUpdate)
router.get('/shoppingcartGetAll',PurchaseConrtollers.ShoppingcartGetAll)
// router.get('/BookSearchGetAll',BookManagementController.BookSearchGetAll)
// router.get('/BookGet',BookManagementController.BookGet)
router.get('/ReceivingMethodGetAll',PurchaseConrtollers.ReceivingMethodGetAll)
router.get('/ReceivingMethodGetOne',PurchaseConrtollers.ReceivingMethodGetOne)
router.get('/ReceivingStateGetAll',PurchaseConrtollers.ReceivingStateGetAll)
router.get('/ReceivingStateGetOne',PurchaseConrtollers.ReceivingStateGetOne)
//---------------------------------------
router.get('/PaymentMethodGetAll',PurchaseConrtollers.PaymentMethodGetAll)
router.get('/PaymentMethodGetOne',PurchaseConrtollers.PaymentMethodGetOne)
router.get('/PaymentStateGetAll',PurchaseConrtollers.PaymentStateGetAll)
router.get('/PaymentStateGetOne',PurchaseConrtollers.PaymentStateGetOne)
//---------------------------------------
router.post('/PurchaseClientsAdd',PurchaseConrtollers.PurchaseClientsAdd)
router.get('/PurchaseClientsGetAll',PurchaseConrtollers.PurchaseClientsGetAll)
router.get('/PurchaseGetAll',PurchaseConrtollers.PurchaseGetAll)



module.exports= router

