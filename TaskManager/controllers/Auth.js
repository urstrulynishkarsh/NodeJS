const User=require("../models/User")
const cron=require('node-cron')
const jwt=require("jsonwebtoken")


exports.create=async(req,res)=>{
    try{
        console.log("request body",req.body)
        const {name,age,email,password,address,phoneNumber,avatar}=req.body;
        if(!name||!age||!email||!password||!address||!phoneNumber)
        {
            console.log("not all fields filled...",name,password,age,email,address,phoneNumber);
            return res.status(400).json({
                status: 400,
                message: "Please fill all fields",
            })
        }
        //create new object and insert into the mongoDB collection 
        const response=await User.create({name,age,email,password,address,phoneNumber,avatar})
        const token=await response.generateAuthToken()
        return res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Student Information Filled Successfully' ,
                token:token
            });
    }catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:e.message
        })
    }   
}

exports.find=async(req,res)=>{
    try {
        // Since the user is already authenticated, you can access their information from req.user (provided by the auth middleware)
        const user =await User.find({});
        return res.status(200).json({
            success: true,
            data: user,
            message: 'User information retrieved successfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

exports.login=async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            // user:user.getPublicProfile()
            user
            // You can send additional user data if needed
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.logout=async(req,res)=>{
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
    
        return res.status(200).json({
            success: true,
            message: "Logout successful",
            // You can send additional user data if needed
        });
    }
    catch(error){
        console.log("loguterror");
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }

}


exports.logoutAll=async(req,res)=>{
    try{
        req.user.tokens = []; // Clear all tokens associated with the user
        await req.user.save(); // Save the user with cleared tokens

        return res.status(200).json({
            success: true,
            message: 'Logged out from all devices successfully.',
        });
    }
    catch(error){
        console.log("error hai",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.update=async(req,res)=>{
    const updates=Object.keys(req.body)
    console.log(updates)
    const allowedUpdates=['name','age','email','password']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
    {
        return res.status(400).json({
            success: false,
            message: 'Invalid updates'
        })
    }
    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        // const users=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // console.log(users)
        return res.status(200).json(
            {
                success: true,
                data: req.user,
                message: 'All data fetched' 
            });

    }catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:e.message
        })
    }
}

exports.getAvatar=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar)
        {
            return res.status(404).json({
                success: false,
                data: "Avatar not found",
                status: 404
            });
        }
        res.set('Content-Type','image/jpg')
        return res.status(200).send(user.avatar); 
    }
    catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:e.message
        })
    }
}










let scheduledTask = null;
exports.del = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId)
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID not found. Please make sure you are logged in.'
            });
        }

        if (scheduledTask) {
            await scheduledTask.destroy();
            scheduledTask = null; // Reset scheduledTask
            return res.status(200).json({
                success: true,
                message: 'Scheduled deletion canceled.'
            });
        }

        // Schedule the deletion after 1 minute
        scheduledTask = cron.schedule("*/1 * * * *", async () => {
            try {
                // Delete the user
                await User.findByIdAndDelete(userId);

                // Send response after deletion
               return res.status(200).json({
                    success: true,
                    message: 'The given data deleted from the database'
                });
            } catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({
                    success: false,
                    message: "Error in deleting user data"
                });
            }
        });

        // Return success message indicating that the deletion is scheduled
        return res.status(200).json({
            success: true,
            message: 'Deletion scheduled. The data will be deleted after 1 minute.'
        });
    } catch (e) {
        console.log("error", e)
        return res.status(500).json({
            success: false,
            data: "Internal Server Problem",
            status: 500,
            message: "Error in scheduling deletion"
        });
    }
};