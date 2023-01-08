const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

const createProject = asyncHandler(async (req, res) => {
    const {projectName, projectTopic, projectDescription, skillsNeeded} = req.body;

    if (!req.user._id) {
        console.log("UserId param not sent with authorization");
        return res.sendStatus(400);
    }

    var newProject = {
        projectName: projectName,
        projectTopic: projectTopic,
        projectDescription: projectDescription,
        skillsNeeded: skillsNeeded,
        creator: req.user._id,
    }

    try {
        var project = await Project.create(newProject);

        project = await project.populate("creator");

        res.json(project);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }

    






});

module.exports = {createProject};