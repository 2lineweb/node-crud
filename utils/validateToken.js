import jwt from "jsonwebtoken";

export const validateToken = (token)=>{
      const validToken = jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY,(err,user)=>{
        if(err)
        {
            return false;    
        }
        else{
            return user
        }
     });
     return validToken;
}
export const validateCookie =  (token)=>{
     const validToken = jwt.verify(token,process.env.REFRESH_TOKEN_PRIVATE_KEY,(err,user)=>{
        if(err)
        {
            return false;
        }
        else{
           return user;
        }
    });
    return validToken;
}