const taskCollection = require("../models/task")
const weeklistCollection = require("../models/weeklist")

const getAllTasks = (req, res) => {
    res.json({
        message : 'working tasks routes'
    })
}


const createTasks = async (req, res) => {

    try {
        const {description, isCompleted} = req.body
        const {id} = req.params
        // const weeklist = 0;
        const weeklist = await weeklistCollection.findById(id)

        const newTask = await taskCollection.create({weeklistName : weeklist.weeklistName, description, isCompleted, markedAt : new Date(Date.now()), weeklist : id})
        res.json({
            message : 'task created successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const updateTask = async (req, res) => {
    try {
        const {isCompleted, description} = req.body
        const {id} = req.params

        const task = await taskCollection.findById(id)

        task.isCompleted = isCompleted
        task.description = description

        await task.save()

        res.status(200).json({
            success : true,
            message : 'updated successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await taskCollection.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const markUnmark = async (req, res) => {
    try {
        const {id} = req.params

        const task = await taskCollection.findById(id)
        task.isCompleted = !task.isCompleted
        task.markedAt = new Date(Date.now())
        await task.save()

        res.status(200).json({
            success: true,
            message: 'updated',
            markedAt : task.markedAt
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const getSpecificTask = async (req, res) => {
    try {
        const {id} = req.params
        const allTasks = await taskCollection.find({weeklist : id})

        allTasks.forEach(async(element) => {
            const deadline = new Date(element.markedAt.getTime() + 24 * 60 * 60 * 1000)

            const currentTime = new Date();
            const timeDifference = deadline - currentTime;

            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const timeLeft = `${hours}h ${minutes}m ${seconds}s`

            element.deadline = timeLeft
            // await element.save()
        })
        

        res.status(200).json({
            success : true,
            allTasks
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {getAllTasks, createTasks, updateTask, deleteTask, markUnmark, getSpecificTask}