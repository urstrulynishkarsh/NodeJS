// const request=require("request")
const geocode=require('./Utils/geocode')
const forecast=require("./Utils/forecast")


// console.log("starting")

// setTimeout(()=>{
//     console.log("2 second wait")
// },2000)

// setTimeout(()=>{
//     console.log("0 second wait")
// },0)

// console.log("stoping")




// const API_KEY="c591d06bcf6bf23a7962eb171f5a77cc";
// const lat=29.9275971;
// const lon=78.139163;

// const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

// // request({url:url},(error,response)=>{
// //     const data=JSON.parse(response.body)
// //     console.log(data)
// // })

// request({url:url,json:true},(error,response)=>{
//     if(error)
//     {
//         console.log("something problem in the http request")
//     }
//     else if(response.body.error)
//     {
//         console.log("unable to find location")
//     }
//     else{
//     console.log(response.body.main.temp)
//     }
// })



// // geocoding
// const address = "haridwar";
// const geoCodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY29vbGR1ZGUxMiIsImEiOiJjbHNsb2Jyc3IwM3Y5MmtvZXc4em45anB3In0.bnWpro1VNvL0VZyUYdUmWA&limit=1'


// request({url:geoCodeurl,json:true},(error,response)=>{
//     if(error)
//     {
//         console.log("something problem in the http request")
//     }
//     else{
//     const latitude=response.body.features[0].center[1]
//     const longitude=response.body.features[0].center[0]
//     console.log(latitude,longitude)
//     }
// })


// geocode("agra",(error,data)=>{
//     console.log("Error",error)
//     console.log("data",data)
// })


// forecast(-75.7088,44.1545,(error,data)=>{
//     console.log("Error",error)
//     console.log("data",data)
// })

const address=process.argv[2]

if(!address)
{
    console.log("please pass address")
}
else{
geocode(address,(error,data)=>{
    if(error)
    {
        return console.log(error)
    }

    // console.log("Error",error)
    console.log("data",data)
    forecast(data.latitude,data.longitude,(error,data)=>{
        if(error)
        {
            return console.log(error)
        }
    // console.log("Error",error)
    console.log("data",data)
})
})

}
