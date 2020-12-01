const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {render} = require('ejs');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

//Express app
const app = express();

//Connect to mongodb
const dbURI = "mongodb+srv://netninja:test1234@cluster0.eoxro.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//Register view engine
app.set('view engine', 'ejs');

//Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//Morgan shows info about route, status and speed in console
app.use(morgan('dev'));

//Homepage redirects to /blogs page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//GET req to about page
app.get('/about', (req, res) => {
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