const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { hash, name, email, password, pic, major, interests, projectinterests, projectblurb, skills} = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    hash,
    name,
    email,
    password,
    pic,
    major, 
    interests, 
    projectinterests, 
    projectblurb, 
    skills,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),

      major: user.major,
      interests: user.interests,
      projectinterests: user.projectinterests,
      projectblurb: user.projectblurb,
      skills: user.skills,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { hash } = req.body;

  const user = await User.findOne({ hash });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),

      major: user.major,
      interests: user.interests,
      projectinterests: user.projectinterests,
      projectblurb: user.projectblurb,
      skills: user.skills,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const emailLookUp = (async(req,res) => {
  const { hash} = req.body;

  const user = await User.findOne({hash:hash});



  if (user==null){
      res.json({accept:"0"});
  }
  else {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),

      major: user.major,
      interests: user.interests,
      projectinterests: user.projectinterests,
      projectblurb: user.projectblurb,
      skills: user.skills,
      accept: "1"
    });
  }



/*     const {email} = req.body;
    console.log(email);
    const user = await User.findOne({email:email});

    console.log(user);
    console.log(user==null);

    if (user==null){
        res.json({token:"0"});
    }
    else {
        res.json({token:"1"});
    } */



});

const updateUser = asyncHandler(async (req, res) => {
  const {name, pic, major, interests, projectinterests, projectblurb, skills} = req.body;

  const updatedUser= await User.findByIdAndUpdate(
    req.user._id,
    {
      _id: req.user._id,
      name:name,
      pic:pic,
      major:major,
      interests:interests,
      projectinterests:projectinterests,
      projectblurb:projectblurb,
      skills:skills
    },
  )

  if (!updatedUser) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),

      major: updatedUser.major,
      interests: updatedUser.interests,
      projectinterests: updatedUser.projectinterests,
      projectblurb: updatedUser.projectblurb,
      skills: updatedUser.skills,
    });
  }
});

module.exports = {registerUser, authUser, allUsers, emailLookUp, updateUser};