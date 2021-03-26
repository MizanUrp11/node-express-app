const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id, (error, blogpost) => {
        res.redirect('/');
    })
}