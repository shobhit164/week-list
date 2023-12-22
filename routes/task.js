const express = require('express')
const isAuthenticated = require('../middleware/auth')
const {getAllTasks, createTasks, updateTask, deleteTask, markUnmark, getSpecificTask} = require('../controllers/task')
const check24 = require('../middleware/check24')
const check7day = require('../middleware/check7day')

const router = express.Router()

router.get('/all-task', isAuthenticated, getAllTasks)
router.get('/weeklist/:id', isAuthenticated, getSpecificTask)
router.post('/create-task/:id', isAuthenticated, createTasks)
router.post('/update-task/:id', isAuthenticated, async (req, res, next) => {
    await check24(req, res, next, 'you can not update task after 24 hours');
}, updateTask)
router.get('/delete-task/:id', isAuthenticated,async (req, res, next) => {
    await check24(req, res, next, 'you can not delete task after 24 hours');
}, deleteTask)
router.get('/task/:id', isAuthenticated, async (req, res, next) => {
    await check7day(req, res, next, 'you can mark/unmark after 7 day');
},  markUnmark)

module.exports = router