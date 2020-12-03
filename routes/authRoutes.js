const {Router} = require('express');
const authController = require('../controllers/authController');
const {
    signup_get,
    login_get,
    signup_post,
    login_post,
} = require('../controllers/authController');

const router = Router();

// Signup GET Route
router.get('/signup', signup_get);

// Login GET Route
router.get('/login', login_get);

// Signup POST Route
router.post('/signup', authController.signup_post);

// Login POST Route
router.post('/login', authController.login_post);

// Logout GET Route
router.get('/logout', authController.logout_get);

module.exports = router;