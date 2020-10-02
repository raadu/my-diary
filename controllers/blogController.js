const Blog = require('../models/blog');

//blog_index
//Get all blog posts from DB
const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('blogs/index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        res.status(404).render('404', {title: "Unable To Show Blogs"});
    })
}

//blog_details
// Find a blog details by blog id
const blog_details = (req, res) => {
    const id = req.params.id;
    
    Blog.findById(id)
    .then((result) => {
        res.render('blogs/details', {blog: result, title: "Blog Details"});
    })
    .catch((err) => {
        res.status(404).render('404', {title: "Cannot find blog details"});
    })
}

//Render new blog create form
const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: "Create Blog"});
}

//Create new blog with information typed in blog create form
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        res.status(404).render('404', {title: "Unable To Create Blog"});
    })
}

//Delete a selected blog
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'});
    })
    .catch((err) => {
        res.status(404).render('404', {title: "Unable To Delete Blog"});
    })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}