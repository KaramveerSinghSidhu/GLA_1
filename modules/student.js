const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
        id : {
            type:Number
        },
        name : {
            type:String
        },
        number : {
            type:Number
        },
        age : {
            type:Number
        }
})

module.exports = mongoose.model('Student', studentSchema)