const {Router} = require('express');
const authController = require('../controllers/authController');
const {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get,
} = require('../controllers/authController');

const router = Router();

// Signup GET Route
router.get('/signup', signup_get);

// Login GET Route
router.get('/login', login_get);

// Signup POST Route
router.post('/signup', signup_post);

// Login POST Route
router.post('/login', login_post);

// Logout GET Route
router.get('/logout', logout_get);

module.exports = router;