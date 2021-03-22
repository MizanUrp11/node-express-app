const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const ejs = require('ejs');

///////////Middlewares////////
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/post',(req,res)=>{
    res.render('post');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port,()=>{
    console.log(`app is running at port: ${port}`);
})