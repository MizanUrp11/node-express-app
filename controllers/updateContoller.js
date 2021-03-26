const BlogPost = require("../models/BlogPost");

module.exports = (req, res) => {
    BlogPost.findByIdAndUpdate(id, {
        title: req.body.title,
        body: req.body.body
    }, (error, blogpost) => {
        res.redirect('/');
    })
}