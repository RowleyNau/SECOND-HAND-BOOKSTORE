const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
// const receptionOfBooksRouter = require('./receptionOfBooksRouter')
const bookManagementRouter = require('./bookManagementRouter');
const otherGoodsManagementRouter = require('./otherGoodsManagementRouter');
const parametersRouter = require('./parametersRouter');
const acceptingBooksRouter = require('./acceptingBooksRouter');
const individualSelection = require('./individualSelectionRouter');
const messages = require('./MessagesRouter');
const purchaseRouter = require('./purchaseRuter');
const goodsRuter = require('./goodsRouter');

router.use('/user', userRouter)
router.use('/Books', bookManagementRouter)
router.use('/parameters', parametersRouter)
router.use('/OtherGoods', otherGoodsManagementRouter)
router.use('/acceptingBooks', acceptingBooksRouter)
router.use('/individualSelection', individualSelection)
router.use('/purchase', purchaseRouter)
router.use('/chats', messages)
router.use('/goods', goodsRuter)
// router.use('/receptionOfBooks', receptionOfBooksRouter)
// router.use('/selectionOfBooks', selectionOfBooksRouter)
// router.use('/salesRouter', salesRouter)

// const selectionOfBooksRouter = require('./selectionOfBooksRouter')
// const salesRouter = require('./salesRouter')
module.exports= router