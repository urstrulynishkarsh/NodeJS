const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('../src/Utils/geocode')
const forecast=require('../src/Utils/forecast')
const cors=require('cors')

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

app.use(cors());

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"nishkarsh"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"you need to pass address first"
        })
    }
    // console.log(req.query)
    
    geocode(req.query.address,(error, { latitude, longitude, location } = {})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
       
        forecast(latitude,longitude,(error,data)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            return res.send({
                forecast:data,
                location,
                address:req.query.address
            })

        })

      
        

    })

    // return res.send({
    //     forecast:"It is snowing",
    //     location:"Haridwar",
    //     address:req.query.address
    // })
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

app.get("/products",(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"you must pass query"
        })
    }
    // console.log(req.query)
    // console.log(req.query.search)
    // console.log(req.query.rating)
    return res.send({
        product:[]
    })
})
// http://localhost:4000/products?search=game&rating=5

app.get("*",(req,res)=>{
    // res.send("hello i am now in 404 page")
    res.render('404')
})

app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}!`)
})