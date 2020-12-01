const User = require('../models/user');

// Signup GET Controller
const signup_get = (req, res) => {
    res.render('auth/signup');
}

// Login GET Controller
const login_get = (req, res) => {
    res.render('auth/login');
}

// Signup POST Controller

// Login POST Controller

// Logout GET Controller

module.exports = {
    signup_get,
    login_get,
}