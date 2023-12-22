const weeklistCollection = require("../models/weeklist")
const taskCollection = require("../models/task")

const addWeekList = async (req, res) => {
    try {

        const existingWeeklistsCount = await weeklistCollection.countDocuments({ user: req.user._id });
        if (existingWeeklistsCount === 2) {
            return res.status(400).json({
                success: false,
                message: 'you already have 2 active weeklists',
            });
        }

        const {weeklistName} = req.body
        const user = req.user._id

        await weeklistCollection.create({weeklistName, user})

        res.status(201).json({
            success: true,
            message: 'Week list created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const deleteWeekList = async (req, res) => {
    try {
        const { id } = req.params;

        const weeklist = await weeklistCollection.findById(id);

        if (!weeklist) {
            return res.status(404).json({
                success: false,
                message: 'Weeklist not found',
            });
        }

        await weeklist.deleteOne()

        res.status(200).json({
            success: true,
            message: 'Weeklist deleted successfully',
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllWeekList = async (req, res) => {
    const id = req.user._id
    
    const weeklists = await weeklistCollection.find({user : id})

    weeklists.forEach(element => {
        const expireDateAndTime = element.expireOn

        const timeDifference = expireDateAndTime - new Date();

        const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

        if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
            element.timeLeft = 'Completed'
        }
        element.timeLeft = `${days}d:${hours}h:${minutes}m:${seconds}s`
    });

    res.status(200).json({
        success : true,
        weeklists
    })
}

module.exports = {addWeekList, deleteWeekList, getAllWeekList}