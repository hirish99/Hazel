const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Project = require("../models/projectModel");


const deleteProject = asyncHandler(async (req, res)  => {
    const {_id}= req.body;

    console.log(_id);

    try {
        var project= await Project.deleteOne({_id: _id});
        res.send(project);
    }
    catch(error){
        console.log(error);
    }
})


const createProject = asyncHandler(async (req, res) => {
    const {projectName, projectTopic, projectDescription, skillsNeeded, pic} = req.body;

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
        pic: pic,
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

const allProjects = asyncHandler(async (req, res) => {
    try{
        const keyword = req.query.search
        ? {
            $or: [
                { projectName: { $regex: req.query.search, $options: "i" } },
                { projectTopic: { $regex: req.query.search, $options: "i" } },
                { projectDescription: { $regex: req.query.search, $options: "i" } },
            ],
            }
        : {};
    
        const projects = await Project.find(keyword).sort({'createdAt':-1}).populate("creator");
        res.send(projects);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);
    }
  });



module.exports = {createProject, allProjects, deleteProject};