const Task = require("../models/Task")



exports.create=async(req,res)=>{
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
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

exports.find=async(req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed)
    {
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy)
    {
        const parts=req.query.sortBy.split(":")
        sort[parts[0]]=parts[1]==='desc'?-1:1;
    }
    try{
        // const tasks=await Task.find({})
        await req.user.populate({

            path:"tasks",
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                // limt:2
               sort
            }
        })

        return res.status(200).json(
            {
                success: true,
                data: req.user.tasks,
                message: 'All data fetched' 
            });

    }
    catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:"data finding mai iuc error hai"
        })
    }
}

exports.findById=async(req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task)
        {
            return res.status(400).json({
                success: false,
                message: 'No found data'
            })
        }
        return res.status(200).json(
            {
                success: true,
                data: task,
                message: 'All data fetched' 
            });
        
    }
    catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:"data finding mai iuc error hai"
        })
    }
}


exports.updated=async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        console.log("req.params.id:", req.params.id);
console.log("req.user._id:", req.user._id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Not found any data')
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        return res.status(200).json(
            {
                success: true,
                data: task,
                message: 'data updated' 
            });
    } catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:"data update mai koi error hai"
        })
    }
}


exports.deleteById=async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Not found any data')
        }

        return res.status(200).json(
            {
                success: true,
                data: task,
                message: 'data deleted' 
            });
    } catch(e){
        console.log("error",e)
        return res.status(500).json({
            success:false,
            data:"Internal Server Problem",
            status:500,
            message:"data delete mai koi error hai"
        })
    }
}
