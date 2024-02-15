const userData={
    1:{id:1,name:"nishkarsh"},
    2:{id:2,name:"ritik"}
}

const getUserSync=(userId)=>{
    const user=userData[userId];
    if(!user)
    {
        throw new Error(`User with ID ${userId} not found`);
    }
    return user;
}

module.exports=getUserSync;