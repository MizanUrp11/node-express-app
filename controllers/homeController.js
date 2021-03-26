const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    await BlogPost.find({}, (error, blogposts) => {
        res.render('index', {
            blogposts
        });
    })
}