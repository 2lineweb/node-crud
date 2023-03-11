
import userBlog from "../models/userBlog.js";
import { blogValidation } from "../utils/validation.js";
import jwt  from "jsonwebtoken";
import userProfile from "../models/userProfile.js";
const getUser = async (req,res)=>{
    const accessToken = req.accessToken;
     const userData = jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,success)=>err?false:success);
     if(userData)
     {
        const {user_name,userId} = userData;
    try{
        const blogList = await userBlog.find({user_id:userId}).select("user_id title blog").exec();
        res.status(200).json({error:false,data:blogList,accessToken});
    }catch(err){
        res.status(500).json({error:true,message:"server error"});
    }
     }//end if
     else{
        res.status(403).json({error:true,message:"unautherize"});
     }
     
}
const getBlog = async (req,res)=>{
const accessToken = req.accessToken;
const userData = jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,success)=>err?false:success);
if(userData)
{
    const {user_name,userId} = userData;
    const blogId = req.params.id;
   try{
   const blog = await userBlog.findById({_id:blogId});
   res.status(200).json({error:false,data:blog,accessToken})

   }catch(err){
    res.status(500).json({error:true,message:"server error",accessToken});
   } 
}// end if
else{
    res.status(403).json({error:true,message:"unautherize",accessToken});
  }
}
const postBlog = async (req,res)=>{
    const accessToken = req.accessToken;
    // validate body
 const {error } = blogValidation(req.body);
 if(error) return res.status(401).json({error:true,message:error.details[0],logedIn:"false",accessToken});
  //validate token
  const userData = jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,success)=>err?false:success);
  if(userData)
  {
    try{
      const inputData = {... req.body,user_id:userData.userId};
    const blogData = new userBlog(inputData);
    const savedData = await blogData.save();
    if(savedData)
    {
        res.status(201).json({error:false,message:" blog inserted",accessToken});
    }
    else{
        res.status(201).json({error:false,message:" blog not inserted",accessToken});
    }
    }catch(err){
      res.status(500).json({error:false,message:" catch blog not inserted",accessToken,err});
    }
    
  }// end if
  else{
    res.status(403).json({error:true,message:"unautherize",accessToken});
  }
}
const putBlog = async (req,res)=>{
    const accessToken = req.accessToken;
    // validate body
    const {error} = blogValidation(req.body);
    if(error) return res.status(401).json({error:true,message:error.details[0],logedIn:"false",accessToken});
  //validate token
  const userData = jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,success)=>err?false:success);
  if(userData)
  {
    const blogData = await userBlog.findByIdAndUpdate(req.params.id,req.body,{new:true});
    
    if(blogData)
    {
        res.status(201).json({error:false,message:" blog updated",accessToken});
    }
    else{
        res.status(201).json({error:false,message:" blog not updated",accessToken});
    }
  }// end if
  else{
    res.status(403).json({error:true,message:"unautherize",accessToken});
  }

}
const deleteBlog = async (req,res)=>{
    const accessToken = req.accessToken;
    const userData = jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,success)=>err?false:success);
  if(userData)
  {
    const blogData = await userBlog.findByIdAndDelete(req.params.id);
    
    if(blogData)
    {
        res.status(201).json({error:false,message:" blog deleted",accessToken});
    }
    else{
        res.status(201).json({error:false,message:" blog not deleted",accessToken});
    }
  }// end if
  else{
    res.status(403).json({error:true,message:"unautherize",accessToken});
  }


}
const logOut = (req,res)=>{
res.clearCookie('jwt');
res.status(200).json({error:false,message:"logout success",accessToken:""});
}

export {
    getUser,
    getBlog,
    putBlog,
    postBlog,
    deleteBlog,
    logOut
}