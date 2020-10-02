const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

//Index page route
router.get('/', blogController.blog_index);

//POST request to add new blog post
router.post('/', blogController.blog_create_post);

//GET request to get and show create blog form
router.get('/create', blogController.blog_create_get);

//Delete a blog
router.delete('/:id', blogController.blog_delete);

//Get blog by id
router.get('/:id', blogController.blog_details);

module.exports = router;