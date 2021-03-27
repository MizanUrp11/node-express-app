const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

/////////Controllers////////////////
const addPostController = require("./controllers/addPostController");
const homeController = require("./controllers/homeController");
const storePostController = require("./controllers/storePostController");
const getPostController = require("./controllers/getPostController");
const updateContoller = require("./controllers/updateContoller");
const getInfoController = require("./controllers/getInfoController");
const deletePostController = require("./controllers/deletePostController");
const validateMiddleware = require("./middlewares/validateMiddleware");
const newUserController = require("./controllers/newUserController");
const storeUserController = require("./controllers/storeUserController");
const User = require("./models/User");
const loginController = require("./controllers/loginController");

///////////Middlewares////////
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/post/new', validateMiddleware);
app.set('view engine','ejs');

app.get('/', homeController);
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/addpost', addPostController);
app.get('/post/:id',getPostController);
app.get('/delete/:id',deletePostController);

var id;
app.get('/update/:id',getInfoController);
app.post('/post/update', updateContoller);
app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.post('/post/store', storePostController);

app.get('/auth/register',(req,res)=>{
    res.render('register');
})
app.get('/auth/login', (req,res)=>{
    res.render('login');
});
app.post('/user/login', loginController);

app.post('/user/register',storeUserController);

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port,()=>{
    console.log(`app is running at port: ${port}`);
})