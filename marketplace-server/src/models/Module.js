const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const moduleSchema = new mongoose.Schema({
    name: String,
    // tokenId: String,
    url: String,
    desc: String,
    imgPath: String,
    price: Number,
    offer: [String]
})

const modelName = 'Module'

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = connection.models[modelName]
}else{
    module.exports = mongoose.model(modelName, modelSchema)
}