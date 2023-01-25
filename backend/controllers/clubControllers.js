const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Club = require("../models/clubModel");

const createClub = asyncHandler(async (req, res) => {
    const {clubName, clubSchool, clubBio, skillsNeeded, admins, pic} = req.body;

    if (!req.user._id) {
        console.log("UserId param not sent with authorization");
        return res.sendStatus(400);
    }

    var newClub = {
        clubName: clubName,
        clubSchool: clubSchool,
        clubBio: clubBio,
        skillsNeeded: skillsNeeded,
        admins: [req.user._id],
        pic: pic,
    }

    try {
        var club = await Club.create(newClub);

        club = await project.populate("admins");

        res.json(project);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }

});

const allClubs = asyncHandler(async (req, res) => {
    try{
        const keyword = req.query.search
        ? {
            $or: [
                { clubName: { $regex: req.query.search, $options: "i" } },
            ],
            }
        : {};
    
        const projects = await Project.find(keyword).sort({'createdAt':-1}).populate("admins");
        res.send(projects);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }
  });



module.exports = {createClub, allClubs};