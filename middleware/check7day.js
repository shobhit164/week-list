const taskCollection = require("../models/task");

const check24 = async (req, res, next, msg) => {
    const {id} = req.params

    const task = await taskCollection.findById(id)

    const timeDifference = new Date() - task.createdAt;

    if (timeDifference > 7 * 24 * 60 * 60 * 1000) {
        return res.status(400).json({
            success: false,
            message: msg,
        });
    }

    next()
}


module.exports = check24