const {Router} = require('express')
const router = Router()

const controllers = require('../controllers/controllers')

router.get('/',controllers.home)

module.exports=router;