const mongoose = require("mongoose")
const BlogPost = require("./models/BlogPost");
mongoose.connect("mongodb://localhost/my_database");
BlogPost.create({
    title:"Hello world",
    body:"This is the body text"
},(error,blogspot)=>{
    console.log(error,blogspot);
})