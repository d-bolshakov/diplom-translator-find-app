const {Schema, model, ObjectId} = require('mongoose')

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {
        firstName: {type: String, required: true},
        lastName:  {type: String, required: true},
    },
    role: {type: String, required: true},
    works: [{type: ObjectId, ref:'Work'}]
})

module.exports = model('User', User)