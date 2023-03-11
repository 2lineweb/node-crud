import  {signUpValidation,logInValidation} from "../utils/validation.js";
import userProfile from "../models/userProfile.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getSignUp = (req,res)=>{
    res.status(200).json({error:false,message:"signup page"});
}

const postSignUp = async (req,res)=>{
    const {error} = signUpValidation(req.body);
    if(error) return res.status(400).json({error:true,message:error.details[0].message});
    const {user_name,password}=req.body;
    try{
        //check user name exist
        const userExist = await userProfile.findOne({user_name});
        // let existMessage=`user ${body.user_name} already exist`;
        if(userExist) return res.status(401).json({error:true,message:`user ${user_name} already exist`});
        // // generate hash password
        const hashPassword = await bcrypt.hash(password,10);

        const inputData = {...req.body,password:hashPassword}
        // insert data
        const userData =  new userProfile(inputData);
        const insertedData = await userData.save();

        res.status(201).json({error:"true",message:"user created"});
    }catch(err){
        res.status(500).json({error:"true",message:"catch authorization",error1:err});
    }

  }
  // login
const getLogIn = (req,res)=>{
    res.status(200).json({error:false,message:"signup page"});
}
const postLogIn = async (req,res)=>{
       
    //validation
    const {error}= logInValidation(req.body);
    if(error) return res.status(401).json({error:true,message:error.details[0],logedIn:"false",access_token:""});
   // check user
   const {user_name,password}=req.body;
   // get data from database
   try{
    // get user cred
    const userData = await userProfile.findOne({user_name});
    if(!userData) return res.status(401).json({error:"true",logedIn:"false",message:"user Not found"});
    
    const userName = userData.user_name;
    const hashPassword = userData.password;

    // check password
    const comparedPassword = await bcrypt.compare(password,hashPassword);
    
      if(!comparedPassword) return res.status(401).json({error:"true",logedIn:"false",message:" password wrong"});

      // generate token
   const payLoad={user_name:userName,userId:userData._id}
   const accessToken = jwt.sign(payLoad,process.env.ACCESS_TOKEN_PRIVATE_KEY,{expiresIn:"10m"});
   const refreshToken = jwt.sign(payLoad,process.env.REFRESH_TOKEN_PRIVATE_KEY,{expiresIn:"1d"});
 

   // asign cookie
   res.cookie('jwt', refreshToken, { httpOnly: true, 
       sameSite: 'None', secure: false, 
       maxAge: 24 * 60 * 60 * 1000 });// we make secure false for development in thunder client only. for  
      res.status(200).json({error:false,message:"user loged in ",logedIn:"true",access_token:accessToken});

   }
   catch(err){
       res.status(500).json({error:"true",message:" authorization"});
   }
    
}
export {
    getSignUp,
    postSignUp,
    getLogIn,
    postLogIn
}