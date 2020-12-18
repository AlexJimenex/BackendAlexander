const express = require('express')
const { route } = require('../app')
const router = express.Router()
const GemsController = require('../controllers/gemsController')
const multiparty = require('connect-multiparty')
router.use(multiparty({
    uploadDir: 'src/tmp'
}

))
router.post('/api/gems',GemsController.createGem)
router.get('/api/gems',GemsController.getAllGems)
router.get('/api/gems/:_id',GemsController.getGem)
router.post('/api/gems/getgemp',GemsController.getGemPost)
router.patch('/api/gems',GemsController.updateGem)
router.delete('/api/gems/:_id', GemsController.deleteGem)
router.post('/api/gems/irgems',GemsController.addReview)
router.post('/api/gems/iigems', GemsController.addImage)
module.exports = router
