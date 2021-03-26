const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    id = req.params.id;
    await BlogPost.findById(req.params.id, (error, blogpost) => {
        res.render('update', {
            blogpost
        });
    })
}