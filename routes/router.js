const { Router } = require('express')
const router = Router()

const controllers = require('../controllers/controllers')

// VIEW CONTROLLERS
router.get('/',controllers.home)
router.get('/rooms',controllers.viewRooms)
router.get('/categories',controllers.viewCategories)
router.get('/features',controllers.viewFeatures)

// router.get('/rooms',controllers.viewRooms)

module.exports=router;