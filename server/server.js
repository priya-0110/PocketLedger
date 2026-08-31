const express = require("express");
const {MongoClient} = require("mongodb")
const bcrypt = require('bcrypt')
const cors = require('cors')
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = 5000;
const client = new MongoClient(process.env.MONGO_URI)
const pocketLedger = client.db('pocketLedger')
const users = pocketLedger.collection('users');
app.use(express.json())
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
app.post('/api/auth/signup',async(req,res)=>{
    try{
        const {name,email,password} = req.body;
    if(!name.trim() || !email.trim() || !password.trim()){
        return res.status(400).json({message:"All Fields are required"})
    }
    const existingUser = await users.findOne({email})
    if(existingUser){
        return res.status(409).json({message : "This Email is already registered"})
    }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = {
        name:name,
        email:email,
        password:hashedPassword
        }
        const result = await users.insertOne(newUser);
        res.status(201).json({
        message:"User Created Succesfully"
        })
    }
    catch(err){
        res.status(500).json({message : "Internal Server Error"})
    }
        

    
})
app.post('/api/auth/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const existingUser = await users.findOne({email});
        if(!existingUser){
            return res.status(401).json({message:"User not found"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Your Password is Incorrect"})
        }
        res.json({message:"You are going to log in"})
    }catch(err){
        res.json({message:"Internal Server Error"});
    }
})
app.listen(PORT,()=>{
    console.log(`server running on port ${5000}`)
})