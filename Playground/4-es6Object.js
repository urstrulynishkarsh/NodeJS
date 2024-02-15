

const name="nsihkarsh"
const userage=21

const user={
    name,
    age:userage,
    location:"konch"
}

console.log(user)


// Object DESTRUCTION 


const product={
    label:"Blue ship",
    price:10,
    stock:701,
    salePrice:undefined,
    rating:4.8
}

// const label=product.label
// const price=product.price
// console.log(label,price)


const {label:productLabel,price,salePrice,stock,rating=5}=product
console.log(price,salePrice,stock,productLabel,rating)



const transaction=(type,{label,stock})=>{
    console.log(type,label,stock)
}

transaction("hello",product)