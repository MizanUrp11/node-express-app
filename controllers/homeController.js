const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    await BlogPost.find({}, (error, blogposts) => {
        console.log(req.session);
        res.render('index', {
            blogposts
        });
    }).populate('userId');
}