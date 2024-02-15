// simple function 
const square=function(x){
    return x*x;
}

console.log(square(3))
console.log(square(10))



// arrow function

const Square=(x)=>{
    return x*x;
}

console.log(Square(3))
console.log(Square(10))


const rectangle=(x,y)=>{
    return x*y;
}

console.log(rectangle(3,7))
console.log(rectangle(10,9))


const ok={
    name:"nishkarsh",
    guestList:["ritik","nitya","pintu"],
    printGuestName(){
        console.log("guest name is "+this.name)
        this.guestList.forEach((guest)=>{
            console.log(guest+" is attending"+this.name)
        })
    }
}
ok.printGuestName()




const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    }, {
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    // getTasksToDo() {
    //     return this.tasks.filter((task) => task.completed === false)
    // }
    getTasksToDo(){
        return this.tasks.filter(task=>
            task.completed===false
        )
       
    }
}

console.log(tasks.getTasksToDo())

