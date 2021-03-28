const User = require("../models/User");

module.exports = (req,res)=>{
    User.create(req.body,(error,user)=>{
        if(error){
            console.log('username already taken');
            const validationErrors = Object.keys(error.errors).map(key=>error.errors[key].message);
            req.session.validationErrors = validationErrors;
            return res.redirect('/auth/register');
        }
        console.log(error,user);
        res.redirect('/');
    });
    User.find({},(error,user)=>{
        console.log(user);
    })
}