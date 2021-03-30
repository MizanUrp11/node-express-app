const paginate = require("express-paginate");
const BlogPost = require("../models/BlogPost");
module.exports = async (req, res, next) => {

    // This example assumes you've previously defined `Users`
    // as `const Users = db.model('Users')` if you are using `mongoose`
    // and that you are using Node v7.6.0+ which has async/await support
    try {

        const [results, itemCount] = await Promise.all([
            BlogPost.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
            BlogPost.count({})
        ]);

        const pageCount = Math.ceil(itemCount / req.query.limit);
        res.render('index', {
            blogposts: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
        //console.log(results);

        // if (req.accepts('json')) {
        //     // inspired by Stripe's API response for list objects
        //     res.json({
        //         object: 'list',
        //         has_more: paginate.hasNextPages(req)(pageCount),
        //         data: results
        //     });
        // } else {
            
        // }

    } catch (err) {
        next(err);
    }

}