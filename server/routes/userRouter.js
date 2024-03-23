const Router = require('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',userControllers.registration)
router.post('/login',userControllers.login)

// router.get('/registration',)
router.get('/auth', authMiddleware, userControllers.check)
// router.de

module.exports= router