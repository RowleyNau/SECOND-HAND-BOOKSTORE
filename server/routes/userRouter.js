const Router = require('express')
const router = new Router()
const userControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration',userControllers.registration)
router.post('/login',userControllers.login)
// authMiddleware, 
// router.get('/registration',)
router.get('/auth', userControllers.check)
router.get('/UserGetOne', userControllers.UserGetOne)
router.get('/UserGetOneId', userControllers.UserGetOneId)
router.get('/UserGetAll', userControllers.UserGetAll)
router.get('/UserSearchGetAll', userControllers.UserSearchGetAll)
router.post('/UserDel',userControllers.UserDel)
// router.de

module.exports= router