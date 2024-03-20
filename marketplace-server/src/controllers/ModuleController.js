const Module = require('../models/Module');
const User = require('../models/User');
const {validationResult, matchedData} = require('express-validator');

module.exports = {
    getList: async (req, res) => {
        let data = await Module.find();

        res.json(data);
    },
    getItem: async (req, res) => {
        let data = await Module.findById(req.body.id);

        res.json(data);
    },
    createList: async (req, res) => {
        const newModule = new Module({
            name: req.body.name,
            url: req.body.url,
            desc: req.body.desc,
            imgPath: req.body.imgPath,
            price: req.body.price
        });

        await newModule.save();
        res.json("Success!");
    },
    createOffer: async (req, res) => {

    },
    acceptOffer: async (req, res) => {

    },
    buyNow: async (req, res) => {
        let user = await User.findOne({token: req.body.token});

        user.modules.push(req.body.id);

        await user.save();
        res.json("Success!");
    }
}