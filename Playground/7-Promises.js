
const doworkCallBack=(callback)=>{
    setTimeout(()=>{
        // callback("hello",undefined)
        callback(undefined,[1,2,4])
    },2000)
}
doworkCallBack((error,result)=>{
    if(error)
    {
        return console.log(error)
    }
    console.log(result)
})



// const doPromiseWork=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve([7,1,2])
//     },3000)
// })

// doPromiseWork.then(result=>
//     console.log("success",result))


const doPromiseWork=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // resolve([7,1,2])
        reject("things went wrong in this")
    },3000)
})

doPromiseWork.then(result=>
    console.log("success",result)).catch((e)=>console.log("error",e))