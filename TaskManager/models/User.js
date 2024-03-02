const mongoose=require("mongoose")
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        required:true,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error("Age must be posistive")
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        // validate:{
        //     validator:validator.isEmail,
        //     message:"Invalid Email Address"
        // }
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("you can't enter password as apssword")
            }
        }
    },
    avatar:{
        type:Buffer
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }] 
},{
    timestamps:true
})


userSchema.virtual("tasks",{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject()
    console.log(userObject);
    delete userObject.password
    delete userObject.tokens
    console.log(userObject);
    return userObject
}

userSchema.methods.generateAuthToken=async function(){

    const user=this;
    const token=jwt.sign({_id:user._id.toString()},"thisismyfirst")

    user.tokens=user.tokens.concat({token})

    await user.save()
    
    return token;
}



userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})

    if (!user) {
        throw new Error("Email not found");
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error("Password is not matched")
    }
    return user;
}

userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password'))
    {
        user.password=await bcrypt.hash(user.password,10)
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user=this;
    await Task.deleteMany({ owner: user._id })
    next()
})

const User=mongoose.model("User",userSchema);

module.exports=User