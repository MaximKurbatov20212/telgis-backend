const Router = require('express')
const router = new Router()

const userController = require('../controllers/user.controller')
const friendController = require('../controllers/friend.controller')


router.post('/registration', userController.createUser)
router.put('/update/:login', userController.updateUser)
router.post('/friends/add', friendController.addFriend)
router.post('/auth', userController.authUser)

module.exports = router