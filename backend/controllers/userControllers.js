//express async handler 
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const expressAsyncHandler = require("express-async-handler");

const registerUser = asyncHandler( async(req,res) => {
    console.log(req.body);
    const {name, email, password, pic} = req.body;

    console.log(req.body)
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter All Fields");
    }


    //mongoDB queries:
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        //status201 means success
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

const authUser = (async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

module.exports = {registerUser, authUser};