const {Schema, model, ObjectId, Mixed, Document} = require('mongoose')

const Translator = new Schema({
    userId: {type: ObjectId, ref:'User'},
    language: [{type: String, required: true}],
    rating: {type: Mixed,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        get: function(rating){
            var ratings = Object.entries(rating)
            var sum = 0
            var total = 0
            for(var [key,value] of ratings){
                total += value;
                sum += value * parseInt(key)
            }
            return Math.round(sum / total)
        },
        set: function(rating){
            if (!(this instanceof Document)){
                if(rating instanceof Object) return rating
                else{throw new Error('')}
            } else {
                if(rating instanceof Object){
                    return rating 
                }
                this.get('rating', null, {getters: false})[r] = 1 + parseInt(this.get('rating', null, {getters: false})[r])
                return this.get('rating', null, {getters: false})}
        },
        validate:{
            validator: function(i){
                var b = [1, 2, 3, 4, 5]
                var v = Object.keys(i).sort()
                return b.every((x, j) => (v.length === b.length) && x === parseInt(v[j]))
            },
            message: "Invalid rating"
        },
        default: {1:1, 2:1, 3:1, 4:1, 5:1}
    }, 
    works: [{type: ObjectId, ref:'Work'}]
},
{toObject:{getters: true}, toJSON:{getters: true}}
)

module.exports = model('Translator', Translator)