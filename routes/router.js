const { Router } = require('express')
const router = Router()

const controllers = require('../controllers/controllers')

// VIEW CONTROLLERS
router.get('/',controllers.home)
router.get('/rooms',controllers.viewRooms)
router.get('/categories',controllers.viewCategories)
router.get('/features',controllers.viewFeatures)

// FEATURE 
router.get('/addFeature',controllers.addFeature)
router.post('/addFeature',controllers.postFeature)
router.post('/removeFeature',controllers.removeFeature)

// ROOM
router.get('/addRoom',controllers.addRoom)
router.post('/addRoom',controllers.postRoom)

// CATEGORY
router.get('/addCategory',controllers.addCategory)
router.post('/addCategory',controllers.postCategory)

module.exports=router;