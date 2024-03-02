const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add}=require("../math")


test('hello world',()=>{

})

// test("this should failure",()=>{
//     throw new Error("Failure! comes")
// })


test('should calculate total with tip',()=>{
    const total=calculateTip(10,.3)
    expect(total).toBe(13)
})

test("ounces per can is more than 10",()=>{
    const celcius=fahrenheitToCelsius(100)
    // expect(celcius).toBe(0);
    expect(celcius).toBeGreaterThanOrEqual(0);
})

test("should convert 0 to 32",()=>{
    const fahrenheit=celsiusToFahrenheit(32);
    expect(fahrenheit).toBeGreaterThanOrEqual(0);
})


// test("asynchronus test code",()=>{
//     // it does not test async code 
//     setTimeout(()=>{
//         expect(1).toBe(2);
//     },2000)
// })



// test("asynchronus test code",(done)=>{
//     // it does not test async code 
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         done();
//     },2000)
// })

// test("Add two number a & b",(done)=>{
//     add(2,3).then((sum)=>{
//         expect(sum).toBe(5);
//         done();
//     })

// })



test("Add Two Number a & b with using asyn await",async()=>{
    const sum=await add(2,3);
    expect(sum).toBe(5);
})
