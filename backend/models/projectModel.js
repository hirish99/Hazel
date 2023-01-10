const mongoose = require('mongoose');

const projectModel = mongoose.Schema(
    {
        projectName:{type:String,trim:true},
        projectTopic:{type:String,trim:true},
        projectDescription:{type:String},
        skillsNeeded:[{type:String,trim:true}],
        pic: {
            type: "String",
            required: true,
            default:
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
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
