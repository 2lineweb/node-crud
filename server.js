import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Joi from "joi";
// import JoiPasswordComplexity from "joi-password-complexity";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import authStatus from "./middleware/authStatus.js";
import { validateToken,validateCookie } from "./utils/validateToken.js";

const app = express();

config();
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
/**================= */

// routes
app.use("/auth",authRouter);
//
app.use(authStatus);
app.use('/user',userRouter);
// logout
//
app.all('/*',(req,res)=>{
res.status(404).json({message:"record not found"})
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
