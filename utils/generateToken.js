import jwt from "jsonwebtoken";
export const generateAccessToken = (payLoad)=>{
    const accessToken = jwt.sign(payLoad,process.env.ACCESS_TOKEN_PRIVATE_KEY,{expiresIn:"15m"});
    return accessToken;
}

export const generateRefeshToken = (payLoad)=>{
    const refreshToken = jwt.sign(payLoad,process.env.REFRESH_TOKEN_PRIVATE_KEY,{expiresIn:"1d"});
    return refreshToken;
}