const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

///////////Middlewares////////
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'));
})
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public','about.html'));
})
app.get('/post',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public','post.html'));
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','contact.html'));
})
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','404.html'))
})
app.listen(port,()=>{
    console.log(`app is running at port: ${port}`);
})