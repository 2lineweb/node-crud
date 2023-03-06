import mongoose from "mongoose";
const schema = mongoose.Schema;

const blogSchema = new schema({
    user_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    blog:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});
const userBlog = mongoose.model('user_blog',blogSchema);
 export default userBlog;