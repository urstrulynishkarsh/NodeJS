setTimeout(()=>{
    console.log("hello ji")
},2000)

const friends=["nishkarsh",'pin','rit']

const shortname=friends.filter((friend)=>{
    return friend.length<=4
})

console.log(shortname)


const geocode=(address,callback)=>{
    setTimeout(()=>{
        const data={
            lat:1,
            lon:2
        }
        // return data;
        // console.log(data)
        callback(data);
    },3000)
}

// console.log(geocode("hello"))

geocode("hello",(data)=>{
    console.log(data)
})


const add=(a,b,callback)=>{
    setTimeout(()=>{
        const sum=a+b;
        callback(sum)
    },4000)
}



add(1,4,(sum)=>{
    console.log(sum)
})