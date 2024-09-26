const Router = require('express')
const router = new Router()
const BookManagementController = require('../controllers/otherGoodsManagementControllers')

router.post('/OtherGoodsAdd',BookManagementController.OtherGoodsAdd);
router.post('/OtherGoodsPhotoAdd',BookManagementController.OtherGoodsPhotoAdd);
router.post('/OtherGoodsDel',BookManagementController.OtherGoodsDel)
router.post('/OtherGoodsUpdate',BookManagementController.OtherGoodsUpdate)
router.get('/OtherGoodsGetAll',BookManagementController.OtherGoodsGetAll)
router.get('/OtherGoodsSearchGetAll',BookManagementController.OtherGoodsSearchGetAll)
router.get('/OtherGoodsGet',BookManagementController.OtherGoodsGet)


module.exports= router