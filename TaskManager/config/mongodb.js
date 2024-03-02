const mongodb=require("mongodb")
const MongoClient=mongodb.MongoClient

const connectionURL='mongodb://127.0.0.1:27017';

const database="Nishkarsh-database"

MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error)
    {
        return console.log("unable to connect")
    }
    console.log("connected correctly")
    const db=client.db(database)

    db.collection("users").ins
})