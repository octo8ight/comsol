const  {checkSchema} = require('express-validator')

module.exports = {
    sign: checkSchema({
        address: {
            trim: true,
            notEmpty: true,
            isLength: {
                option: {
                    min: 10
                },
                errorMessage: 'public key invalid'
            }
        }
    }),
    signup: checkSchema({//validator signup
        name:{
            trim: true, 
            notEmpty: true,
            isLength:{
                option:{
                    min: 2
                },
                errorMessage:'Name must have at least 2 characters'
            }
        },
        email:{
            isEmail:true,
            normalizeEmail: true,
            errorMessage: 'E-mail invalid'
        },
        password: {
            notEmpty: true,
            isLength:{
                min:3
            },
            errorMessage: 'Password needs at least 2 characters'
        }
    }),


    signin: checkSchema({//validator signin

        email:{
            isEmail:true,
            normalizeEmail: true,
            errorMessage: 'E-mail invalid'
        },
        password: {
            notEmpty: true,
            isLength:{
                min:3
            },
            errorMessage: 'Password needs at least 2 characters'
        },
    })

}