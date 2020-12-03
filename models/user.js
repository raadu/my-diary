const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Minimum password length is 6 characters"]
    },
});

//Fire a function AFTER doc saved to DB
userSchema.post('save', (doc, next) => {
    console.log("new user created and saved", doc);
    next(); //do this and go to next event
});

//Fire a function BEFORE doc saved to DB
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    //this has user object contains user email and password
    this.password = await bcrypt.hash(this.password, salt); //password is edited with hash
    next(); //do this and go to next event
});

//static method to login user
userSchema.statics.login = async function(email, password) {
    // Query for the given user email
    const user = await this.findOne({email});

    //If there is a user then compare password
    if(user) {
        //compare input password with DB pasword
        const auth = await bcrypt.compare(password, user.password);
        //If password matched then return user
        if(auth) {
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Email");
};

const User = mongoose.model('user', userSchema);

module.exports = User;