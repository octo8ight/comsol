const Module = require('../models/Module');
const User = require('../models/User');
const {validationResult, matchedData} = require('express-validator');
const formidable = require('formidable');
const multer  = require('multer');
const fs  = require('fs');
const mongoose = require('mongoose');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });
  
  // Create the multer instance
const upload = multer({ dest: 'uploads/' });

module.exports = {
    getList: async (req, res) => {
        let data = await Module.find();

        return res.json(data);
    },
    getItem: async (req, res) => {
        console.log(req.body.id)
        if (req.body.id == "undefined")
            return res.status(500).json({err: 'errors'});
        const dd = await Module.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.body.id)
                }
            }, {
                $unwind: {
                    path: '$offer',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: 'users',
                    localField: 'offer.user',
                    foreignField: '_id',
                    as: 'offer.user'
                }
            }, {
                $unwind: {
                    path: '$offer.user',
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: "$_id",
                    "name": {$first: "$name"},
                    "url": {$first: "$url"},
                    "desc": {$first: "$desc"},
                    "imgPath": {$first: "$imgPath"},
                    "price": {$first: "$price"},
                    "rating": {$first: "$rating"},
                    "review": {$first: "$review"},
                    "Date": {$first: "$Date"},
                    "offer": {$push: "$offer"},
                }
            }
        ]);

        let data = dd[0];
        let user = await User.findOne({token: req.body.token});
        if (user !== null && user.modules.findIndex(item => String(item) === String(data._id)) < 0) {
            let saveData = await Module.findById(req.body.id);
            saveData.review++;
            await saveData.save();
        }

        return res.json({
            data,
            owner: user === null ? false : (user.modules.findIndex(item => String(item) === String(data._id)) < 0 ? false : true)
        });
    },
    createList: async (req, res) => {
        console.log(req.file);
        // console.log(req.body.data);
        // const file = req.files;

        const data = JSON.parse(req.body.data);
        // upload.single(req, res, function (err) {
        //     if (err) {
        //         return res.end("Something went wrong:(");
        //     }
        //     res.end("Upload completed.");
        // });
        const newModule = new Module({
            name: data.name,
            url: data.url,
            desc: data.desc,
            imgPath: '/public/data/uploads/'+req.file.filename,
            price: data.price
        });

        let user = await User.findOne({token: req.body.token});
        const moduletoken = await newModule.save();
        user.modules.push(moduletoken._id);
        await user.save();

        return res.json("Success!");
    },
    createOffer: async (req, res) => {
        let moduletoken = await Module.findById(req.body.id);

        let user = await User.findOne({token: req.body.token});
        let index = moduletoken.offer.findIndex(item => String(item.user) === String(user._id));
        if (index >= 0)
            return res.json({err: "You already send offer."});
        moduletoken.offer.push({
            user: user._id,
            price: req.body.price,
            offer: req.body.offer
        });

        await moduletoken.save();
        return res.json("Success!");
    },
    acceptOffer: async (req, res) => {
        let moduletoken = await Module.findById(req.body.id);

        let index = moduletoken.offer.findIndex(item => item._id === req.body.offerId);
        if (index < 0) {
            return res.json("Offer not found!");
        }

        moduletoken.offer[index].status = 'accept';
        await moduletoken.save();
        return res.json("Accept!");
    },
    buyNow: async (req, res) => {
        let user = await User.findOne({token: req.body.token});

        user.modules.push(req.body.id);

        await user.save();
        return res.json("Success!");
    },

    acceptOfferStatus: async (req, res) => {
        let moduletoken = await Module.findById(req.body.id);

        let index = moduletoken.offer.findIndex(item => String(item._id) === String(req.body.offerId));
        if (index < 0) {
            return res.json("Offer not found!!!");
        }

        moduletoken.offer[index].status = 'accept';
        await moduletoken.save();
        return res.json(moduletoken);
    },
    rejectOfferStatus: async (req, res) => {
        let moduletoken = await Module.findById(req.body.id);

        let index = moduletoken.offer.findIndex(item => String(item._id) === String(req.body.offerId));
        if (index < 0) {
            return res.json("Offer not found!!!");
        }

        moduletoken.offer[index].status = 'reject';
        await moduletoken.save();
        return res.json(moduletoken);
    }
}