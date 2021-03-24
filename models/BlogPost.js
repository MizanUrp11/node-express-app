const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    body: String
})

const BlogPost = mongoose.model('BlogPost',BlogSchema);
module.exports = BlogPost;