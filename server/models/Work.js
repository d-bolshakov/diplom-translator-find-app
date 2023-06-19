const {Schema, model, ObjectId} = require('mongoose')

const Work = new Schema({
    customer: {type: ObjectId, ref: 'User'},
    translator: {type: ObjectId, ref: 'Translator'},
    status: {type: String},
    dateCreated: {type: Date},
    data: {
        language: {
            from: {type: String},
            to: {type: String}
        },
        description: {type: String},
        url: {type: String},
        deadline: {type: Date},
        price: {type: Number}
    },
    response: {
        url: {type: String},
        dateResponded: {type: Date} 
    }
})

module.exports = model('Work', Work)