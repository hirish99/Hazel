//express async handler 
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const expressAsyncHandler = require("express-async-handler");

const registerUser = asyncHandler( async(req,res) => {
    const {name, email, major, plexp, mlexp, wdexp, pic} = req.body;

    //mongoDB queries:
    const userExists = await User.findOne({email});

    if (userExists) {
        //res.status(400);
        res.json({
            pic: "exists",
        });
        //throw new Error("User already exists");
    }
    else {

        const user = await User.create({
            name, 
            email,
            major, 
            plexp, 
            mlexp, 
            wdexp, 
            pic,
        });
    
        if (user) {
            //status201 means success
            res.status(201);
            res.json({
                message: "success",
            });
        } else {
            res.status(400);
            throw new Error("Failed to Create the User");
        }

    }
});



const emailLookUp = (async(req,res) => {

    const {email} = req.body;
    console.log(email);
    const user = await User.findOne({email:email});

    if (user){
        res.json({
            token: "1",
        });
    }
    else {
        res.json({
            token: "0",
        });
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
        //res.status(201);
        console.log("Wrong")
        res.json({
            token: "-1",
        });
        //throw new Error("Invalid Email or Password");
    }
});

//  /api/user?search=hirish
const allUsers = asyncHandler(async  (req, res) =>{
    //this utilizes a tertiary operator in case the query is misinputted
    const keyword = req.query.search ? {
        $or: [
            { name: {$regex: req.query.search, $options: "i"}},
            { email: {$regex: req.query.search, $options: "i"}}
        ],
    }
    : {};

    const users = await User.find(keyword).find({_id: {$ne: req.user._id}});
    res.send(users);
});

module.exports = {registerUser, authUser, allUsers,emailLookUp};