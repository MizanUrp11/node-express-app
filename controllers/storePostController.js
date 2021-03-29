const BlogPost = require("../models/BlogPost");
const path = require("path");
module.exports = (req, res) => {
    let image = req.files.image;
    if(req.session.userId){
        image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name,
                userId: req.session.userId
            });
        });
        res.redirect('/');
    }
}