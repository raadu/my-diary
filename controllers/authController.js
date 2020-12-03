const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Function for handling form errors
const handleErrors = (err) => {
    // Create errors object to handle individual errors
    let errors = {
        email: "",
        password: "",
    };

    // Incorrect Email
    if(err.message === "Incorrect Email") {
        errors.email = "That email is not registered";
    }

    // Incorrect Password
    if(err.message === "Incorrect Password") {
        errors.password = "That password is incorrect";
    }

    // Duplicate email error (email exists alreay in DB)
    if(err.code === 11000) {
        errors.email = "Email is already registered";

        return errors;
    }

    // Validation errors
    // Get values of errors object and assign properties to them
    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
} 

// Create Token
const maxAge = 3*24*60*60; //in seconds (3 days)
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn: maxAge},
    );
}

// Signup GET Controller
const signup_get = (req, res) => {
    res.render('auth/signup');
}

// Login GET Controller
const login_get = (req, res) => {
    res.render('auth/login');
}

// Signup POST Controller
const signup_post = async (req, res) => {
    const {email, password} = req.body;

    //Try to create a new user with email, password in DB
    //If fails then pass error as response
    try {
        const user = await User.create({
            email,
            password,
        });
        //get jwt token
        const token = createToken(user._id);
        //set the jwt token as cookie
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
        // Send json user data after the create user in DB is successful
        res.status(201).json({
            status: "Signup Success",
            user: user._id
        });
    }
    catch (err) {
        // Call error handling function
        const errors = handleErrors(err);
        // Show error object as response
        res.status(400).json({errors});
    }
}

// Login POST Controller
const login_post = async (req, res) => {
    const {email, password} = req.body;
    // If user exists then create a jwt token
    // If fails then return error as response
    try {
        // If user returns from the login static function in User model
        const user = await User.login(email, password);
        //get jwt token
        const token = createToken(user._id);
        //set the jwt token as cookie
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
        res.status(200).json({
            status: "Login Success",
            user: user._id
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

// Logout GET Controller
const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get,
}