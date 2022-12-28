const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    major:{type:String,required:true},
    plexp:{type:String,required:true},
    mlexp:{type:String,required:true},
    wdexp:{type:String,required:true},
    pic:{type:String,required:true,default:"https://icon-library.com/images/22224-tiger-icon_5825.png"},
},
{
    timestamps:true
}
);

userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
/*
//Before saving run this async function
userSchema.pre('save', async function (next) {
    //If the password has already been modified then dont run the code below
    //i.e. run next()
    if (!this.isModified) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
*/

const User = mongoose.model("User",userSchema);
module.exports = User;