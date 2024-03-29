const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const moduleSchema = new mongoose.Schema({
    name: String,
    // tokenId: String,
    url: String,
    desc: String,
    imgPath: String,
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: Number,
        default: 0
    },
    price: Number,
    offer: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        price: Number,
        Date: {
            type: Date,
            default: Date.now()
        },
        offer: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ['waiting', 'accept', 'reject'],
            default: 'waiting'
        }
    }],
    Date: {
        type: Date,
        default: Date.now()
    }
})

const modelName = 'Module'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, moduleSchema)
}