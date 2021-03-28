const BlogPost = require("../models/BlogPost");

module.exports = (req, res) => {
    let image = req.files.image;
    if(req.session.userId){
        image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            });
        })
    }else{
        res.redirect('/auth/login');
    }
}