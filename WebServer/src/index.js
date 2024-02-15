const express=require('express')
const path=require('path')
const hbs=require('hbs')

const app=express()
const PORT=4000;

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))


// define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// setup handlebars engibe and views location
app.set('view engine', 'hbs');
app.set('views',viewPath)
hbs.registerPartials(partialPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"weather APP hai",
        name:"nishkarsh"
    })
})


app.get('/new',(req,res)=>{
    return res.json({
        success:true,
        message:"your server is running........"
    })
})

// app.get("/about",(req,res)=>{
//     res.send("<h1>i am now in about page</h1>")
// })

app.get("*",(req,res)=>{
    // res.send("hello i am now in 404 page")
    res.render('404')
})

app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}!`)
})