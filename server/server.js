const express = require("express");
const {MongoClient} = require("mongodb")
require("dotenv").config();
const app = express();
const PORT = 5000;
const client = new MongoClient(process.env.MONGO_URI)
const connectToDB = async ()=>{
    try{
        await client.connect();
        console.log("MongoDB connected Successfully")
    }
    catch(err){
        console.log("MongoDB Connection Failed, ",err);
    }
}
connectToDB();
app.get('/',(req,res)=>{
    res.send("Hello V")
})
app.get('/api/test',(req,res)=>{
    res.send("Backend is Working")
})
app.listen(PORT,()=>{
    console.log(`server running on port ${5000}`)
})