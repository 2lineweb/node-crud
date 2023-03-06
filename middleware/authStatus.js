import jwt from "jsonwebtoken";
import { validateToken , validateCookie} from "../utils/validateToken.js";
const authStatus = (req,res,next)=>{
    if(req.cookies.jwt)
    {
     const beareHeader = req.headers['authorization'];
     if(typeof beareHeader !== 'undefined')
     {
        const bearer = beareHeader.split(' ');
        const accessToken = bearer[1];
        // verify access token
        const validToken = validateToken(accessToken);
        if(validToken)
        {
            req.accessToken = accessToken;
            next();   
        }
        else{
            const refreshTooken = req.cookies.jwt;
            // validate cookie
            const validCookie= validateCookie(refreshTooken);
            if(validCookie)
            {
                const payLoad = { user_name:validCookie.user_name,userId:validCookie.userId}
                // generate access token
            const accessToken = jwt.sign(payLoad,process.env.REFRESH_TOKEN_PRIVATE_KEY,{expiresIn:"15m"});
            req.accessToken = accessToken;
            next();
            }
            else{
                return res.status(401).json({error:true,isLogedIn:false,message:"unauthorized no refresh token"});
            }

        }

     }//end if
     else{
        return res.status(401).json({error:true,isLogedIn:false,message:"unauthorized no token"});
     }
    }//end if
    else{
        return res.status(401).json({error:true,isLogedIn:false,message:"unauthorized no cookie"});
    }
}

export default authStatus;