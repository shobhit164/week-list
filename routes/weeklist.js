const express = require('express')
const {addWeekList, deleteWeekList, getAllWeekList} = require('../controllers/weeklist')
const isAuthenticated = require('../middleware/auth')
const check24 = require('../middleware/check24')
const router = express.Router()

router.get('/all-weeklist', isAuthenticated, getAllWeekList)
router.post('/create-weeklist',isAuthenticated, addWeekList)
router.get('/delete-weeklist/:id',isAuthenticated,async (req, res, next) => {
    await check24(req, res, next, 'you can not delete weeklist after 24 hours');
}, deleteWeekList)

module.exports = router