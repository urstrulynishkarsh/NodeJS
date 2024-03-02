const User=require("../models/User")





exports.readById=async(req,res)=>{

    try{
        const _id=req.params.id
        console.log(_id)
        const users=await User.findById(_id)
        console.log(users)
      
        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
     
        return res.status(200).json(
            {
                success: true,
                data: users,
                message: 'All data fetched' 
            });
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
        const users=await User.findById(req.params.id)
        updates.forEach((update)=>{
            users[update]=req.body[update]
        })
        await users.save()
        // const users=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        // console.log(users)

        if (!users) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json(
            {
                success: true,
                data: users,
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

