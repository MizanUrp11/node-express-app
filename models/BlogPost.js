const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    body: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String
})

const BlogPost = mongoose.model('BlogPost',BlogSchema);
module.exports = BlogPost;