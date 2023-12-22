const jwt = require('jsonwebtoken')
const userCollection = require('../models/user')

const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return res.status(404).json({
            success : false,
            message : 'Login First'
        })
    }      

    const decoded_data = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await userCollection.findById(decoded_data._id)
    next()
}

module.exports = isAuthenticated