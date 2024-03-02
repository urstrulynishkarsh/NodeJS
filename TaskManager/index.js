// requore module
const express=require("express")
const path=require("path")
const cors=require("cors")




// connect express, port and dotenv file
const app=express()
const port=process.env.PORT||3000;

// import database
const database=require("./config/database")


// connnecting data base
database.DBconnect()



const multer=require('multer')
const upload=multer({
	dest:'images'
})

app.post("/upload",upload.single('upload'),(req,res)=>{
	return res.status(200).json({
		success:true,
		message:"Your file uploaded successfully"
	})
})

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use((req,res,next)=>{
// 	res.status(503).send("site is under maintainace")
// })

const userRoutes=require("./routes/User")
const taskRoute=require("./routes/task")

// routes
app.use("/api/v1",userRoutes);
app.use("/api/v1",taskRoute)



// default route  

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(port,()=>{
    console.log(`App is running at PORT ${port}`)
})

















// // dummy work
// const bcrypt=require('bcrypt')

// const myfunction=async()=>{
// 	const password="Red123";
// 	const hashedPassword=await bcrypt.hash(password,10)
// 	console.log(password)
// 	console.log(hashedPassword)

// 	// const isMatch=await bcrypt.compare("hello",hashedPassword)
// 	const isMatch=await bcrypt.compare(password,hashedPassword)
// 	console.log(isMatch)
// }

// myfunction()





// const jwt=require("jsonwebtoken");
// // const Task = require("./models/Task");

// const myJwtFunction=async()=>{
// 	// id and signature  and extra expire 
// 	const token=jwt.sign({_id:'abc123'},"this is my new jwt token",{expiresIn:"7 days"})

// 	console.log("here is token",token)

// 	const data=jwt.verify(token,"this is my new jwt token")
// 	console.log("my jwt data",data)

// }
// myJwtFunction()






// // const main=async()=>{
// // 	const task=await Task.findById("65d5f5e6ba6891a8485ba20c")

// // 	await task.populate('owner')
// // 	console.log("this is my task data",task.owner)
// // }

// // main()