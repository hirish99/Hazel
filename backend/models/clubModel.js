const mongoose = require('mongoose');

const clubModel = mongoose.Schema(
    {
        clubName:{type:String,trim:true},
        clubSchool:{type:String,trim:true},
        clubBio:{type:String},
        skillsNeeded:[{type:String,trim:true}],
        pic: {
            type: "String",
            required: true,
            default:
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        admins:
            [{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            }],
    },
    {
        timestamps:true,
    }
)

const Club = mongoose.model("Club",clubModel);
module.exports = Club;
