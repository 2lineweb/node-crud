import mongoose from "mongoose";
const schema = mongoose.Schema;
const profileSchema = new schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    user_name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:String,
    active:Number,
},
{
    timestamps:true
});
const userProfile = mongoose.model('user_profile',profileSchema);
export default userProfile;
