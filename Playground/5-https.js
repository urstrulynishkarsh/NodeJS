
const https=require("https");
const API_KEY="c591d06bcf6bf23a7962eb171f5a77cc";
const lat=29.9275971;
const lon=78.139163;
const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

const request=https.request(url,(response)=>{
    let data=''
    response.on('data',(chunk)=>{
        data=data+chunk.toString()
    })
    response.on('end',()=>{
        const body=JSON.parse(data)
        console.log(body)
    })
})

request.on("error",(error)=>{console.log(error)})

request.end()