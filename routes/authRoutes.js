const {Router} = require('express');
const {
    signup_get,
    login_get,
} = require('../controllers/authController');

const router = Router();

// Signup GET Route
router.get('/signup', signup_get);

// Login GET Route
router.get('/login', login_get);

// Signup POST Route

// Login POST Route

// Logout GET Route

module.exports = router;