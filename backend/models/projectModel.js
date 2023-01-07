const mongoose = require('mongoose');

const projectModel = mongoose.Schema(
    {
        projectName:{type:String,trim:true},
        projectTopic:{type:String,trim:true},
        projectDescription:{type:String},
        skillsNeeded:[{type:String,trim:true}],
        creator:
            {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
    },
    {
        timestamps:true,
    }
)

const Project = mongoose.model("Project",projectModel);
module.exports = Project;
