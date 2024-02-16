const request=require("request")
const API_KEY="c591d06bcf6bf23a7962eb171f5a77cc";

const forecast=(lat,lon,callback)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback("unable to connect to weather services",undefined)
        }
        else if(response.body.error)
        {
            callback("Unable to find loaction try another search",undefined)
        }
        else{
            callback(undefined,
                `In the serene city of ${response.body.name}, located in ${response.body.sys.country} with coordinates of ${response.body.coord.lat} and ${response.body.coord.lon} the current weather is characterized by ${response.body.weather[0].description}, a temperature of ${response.body.main.temp}, and a comfortable humidity of ${response.body.main.humidity}% `
            )
        }
        console.log(response.body)

    })
}


module.exports=forecast