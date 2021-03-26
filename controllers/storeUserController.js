const User = require("../models/User");

module.exports = (req,res)=>{
    User.create(req.body,(error,user)=>{
        console.log(user);
        res.redirect('/');
    });
    User.find({},(error,user)=>{
        console.log(user);
    })
}