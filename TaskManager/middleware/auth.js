const jwt=require("jsonwebtoken")
require("dotenv").config()
const cookieParser=require('cookie-parser');
const User=require("../models/User")

exports.auth=async(req,res,next)=>{
    try{

        console.log("BEFORE ToKEN EXTRACTION");
         //extract token
         const token = req.header('Authorization').replace('Bearer ', '')
         console.log("herr is token",token)
         console.log("After ToKEN EXTRACTION");
         const decoded = jwt.verify(token,"thisismyfirst")
         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
         console.log(user)
 
        if (!user) {
            throw new Error('User not Found')
        }
        req.token = token
        req.user = user
        next();
    }
    catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token or user not found',
        });
    }
}