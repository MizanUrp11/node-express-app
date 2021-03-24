const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const ejs = require('ejs');
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");

///////////Middlewares////////
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',async (req,res)=>{
    await BlogPost.find({},(error,blogposts)=>{
        res.render('index',{
            blogposts
        });
    })
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/post/new', (req, res) => {
    res.render('create');
})
app.get('/post/:id',async (req,res)=>{
    await BlogPost.findById(req.params.id,(error,blogpost)=>{
        res.render('post',{
            blogpost
        })
    })
})
app.get('/delete/:id',async (req,res)=>{
    await BlogPost.findByIdAndDelete(req.params.id,(error,blogpost)=>{
        res.redirect('/');
    })
})

var id;
app.get('/update/:id',async (req,res)=>{
    id = req.params.id;
    await BlogPost.findById(req.params.id,(error,blogpost)=>{
        res.render('update',{
            blogpost
        });
    })
})
app.post('/post/update',(req,res)=>{
    BlogPost.findByIdAndUpdate(id,{
        title: req.body.title,
        body: req.body.body
    },(error,blogpost)=>{
        res.redirect('/');
    })
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.post('/post/store',(req,res)=>{
    BlogPost.create(req.body,(error,blogspot)=>{
        res.redirect('/');
    });
});
app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port,()=>{
    console.log(`app is running at port: ${port}`);
})