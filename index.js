const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

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
const authMiddleware = require("./middlewares/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middlewares/redirectIfAuthenticatedMiddleware");
const viewLoginPageController = require("./controllers/viewLoginPageController");
const viewRegisterPageController = require("./controllers/viewRegisterPageController");
const logoutController = require("./controllers/logoutController");

///////////Middlewares////////
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/post/new', validateMiddleware);
app.use(expressSession({secret: 'keyboard cat'}));

global.loggedIn = null;
app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId;
    next();
})
app.set('view engine','ejs');

app.get('/', homeController);
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/addpost', authMiddleware,addPostController);
app.get('/post/:id',getPostController);
app.get('/delete/:id',deletePostController);

var id;
app.get('/update/:id',getInfoController);
app.post('/post/update', updateContoller);
app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.post('/post/store', authMiddleware, storePostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, viewRegisterPageController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, viewLoginPageController);
app.post('/user/login',redirectIfAuthenticatedMiddleware, loginController);

app.post('/user/register',redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/logout',logoutController);

app.listen(port,()=>{
    console.log(`app is running at port: ${port}`);
})
app.use((req,res)=>{res.render('404')});