import { validateToken , validateCookie} from "../utils/validateToken.js";
import jwt  from "jsonwebtoken";
const isLogedIn = (req,res,next)=>{
    if(req.cookies?.jwt)
    {
        const refreshTooken = req.cookies.jwt;
        // validate cookie
        const validCookie= validateCookie(refreshTooken);
        if(validCookie)
        {
            const payLoad = { user_name:validCookie.user_name,userId:validCookie.userId}
            // generate access token
        const accessToken = jwt.sign(payLoad,process.env.REFRESH_TOKEN_PRIVATE_KEY,{expiresIn:"15m"});
        return res.status(200).json({error:false,isLogedIn:true,accessToken,message:"already loged in"});
        }
        else{
            next();
        }
    }//end if
    else{
        next();
    }
}

export default isLogedIn;