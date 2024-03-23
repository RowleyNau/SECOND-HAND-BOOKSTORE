const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const receptionOfBooksRouter = require('./receptionOfBooksRouter')
const photoBooksForReceptionRouter = require('./photoBooksForReceptionRouter')

router.use('/user', userRouter)
router.use('/receptionOfBooks', receptionOfBooksRouter)
router.use('/photoBooksForReception', photoBooksForReceptionRouter)

module.exports= router