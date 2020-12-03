const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const {render} = require('ejs');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const {
    requireAuth,
    checkUser,
} = require('./middlewares/authMiddleware');
require('dotenv').config();

//Express app
const app = express();

//Connect to mongodb
mongoose.connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then((result) => {
    app.listen(3000);
    console.log("Database Connected");
    console.log("Started listening on port: 3000");
})
.catch((err) => {
    console.log(`Database connection error: ${err}`);
});

//Register view engine
app.set('view engine', 'ejs');

//Middleware and static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//cookieparser can access a cookie method in response object
app.use(cookieparser());

//Morgan shows info about route, status and speed in console
app.use(morgan('dev'));

// Check if user is logged in before going to any routes
app.get("*", checkUser);

//Homepage redirects to /blogs page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//GET req to about page
app.get('/about', requireAuth, (req, res) => {
    res.render('about', {title: "About"});
});

//Redirects to about page
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

//Blog routes. To all the routes in cotrollers/blogController
app.use('/blogs', blogRoutes);

//Auth routes. All authentications done here.
app.use(authRoutes);

//404 error page
//if no routes matches then fire this function
//scoped, put at the end of every routes
app.use((req, res) => {
    res.status(404).render('404', {title: "Error 404"});
});