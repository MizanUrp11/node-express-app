const BlogPost = require("../models/BlogPost")

module.exports = async (req, res) => {
    await BlogPost.findById(req.params.id, (error, blogpost) => {
        res.render('post', {
            blogpost
        })
    })
}