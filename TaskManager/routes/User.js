// Import the required modules
const express = require("express")
const router = express.Router()
const sharp=require('sharp')
const multer=require('multer')



const {login,create,find,logout,logoutAll,del,update,getAvatar}=require("../controllers/Auth")
const { auth } = require("../middleware/auth")

router.post("/users",create)
router.get("/users/me",auth,find)
router.post("/users/login",login)
router.post("/users/logout",auth,logout)
router.post("/users/logoutall",auth,logoutAll)
router.delete("/users/me",auth,del)
router.put("/users/me",auth,update)

router.get("/users/:id/avatar",getAvatar)

const upload=multer({
    dest:"avatars",
	limits:{
		fileSize:1000000
	},
	fileFilter(req,file,cb){
		// if(!file.originalname.endsWith('.pdf'))
		// {
		// 	return cb(new Error("Please Upload a PDF"))
		// }

		if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
		{
			return cb(new Error("Please Upload a PDF"))
		}
		cb(undefined,true)
	}
})


router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
	const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
	req.user.avatar=buffer
	await req.user.save();
    return res.status(200).json({
		success:true,
		message:"Your file uploaded successfully"
	})
},(error,req,res,next)=>{
	return res.status(400).json({
		success:false,
		message:error.message
	})
}
)


router.delete('/users/me/avatar',auth,async(req,res)=>{
	try {
        req.user.avatar = undefined;
        await req.user.save();
        return res.status(200).json({
            success: true,
            message: "Your file uploaded successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }

})


module.exports=router;