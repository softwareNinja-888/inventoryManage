const { Router } = require('express')
const router = Router()

const controllers = require('../controllers/controllers')

// VIEW CONTROLLERS
router.get('/',controllers.home)
router.get('/rooms',controllers.viewRooms)
router.get('/types',controllers.viewRooms)
router.get('/features',controllers.viewRooms)

// router.get('/rooms',controllers.viewRooms)

module.exports=router;