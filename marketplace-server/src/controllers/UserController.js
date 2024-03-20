const User = require('../models/User');
const {validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt');

module.exports = {
    getInfo: async (req, res) => {
        let token = req.query.token;

        const user = await User.aggregate([
            {
                $match: token
            },
            {
                $unwind: {
                    path: 'modules',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'Users',
                    localField: 'modules',
                    foreignField: '_id',
                    as: 'modules'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    info: {
                        name: '$name',
                        email: '$email',
                        token: '$token',
                        modules: {
                            $push: '$modules'
                        }
                    }
                }
            }
        ]);

        res.json(user[0]);
    },
    setInfo: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);
        const user = await User.findOne({token: data.token});

        let updates = {};
        if (data.name) {
            updates.name = data.name;
        }

        if (data.email) {
            const emailCheck = await User.findOne({email: data.email});
            if (emailCheck) {
                 res.json({error: "Existing email!"});
                 return;
            }
            updates.email = data.email;
        }
        if (data.password) {
            updates.passwordHash = await bcrypt.hash(data.passwordHash, 10);
        }

        await User.findOneAndUpdate({token: data.token}, {$set: updates});
        res.json("Success!");
    }
}