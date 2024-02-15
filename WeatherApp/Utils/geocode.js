const request=require('request')
const geocode=(address,callback)=>{
    
    const geoCodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY29vbGR1ZGUxMiIsImEiOiJjbHNsb2Jyc3IwM3Y5MmtvZXc4em45anB3In0.bnWpro1VNvL0VZyUYdUmWA&limit=1'
    request({url:geoCodeurl,json:true},(error,response)=>{
        if(error)
        {
            callback("unable to connect to location services",undefined)
        }
        else if(response.body.features.length===0)
        {
            callback("Unable to find loaction try another search",undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode