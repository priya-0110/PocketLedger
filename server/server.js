const express = require("express");
const {MongoClient,ObjectId} = require("mongodb")
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = 5000;
const client = new MongoClient(process.env.MONGO_URI)
const pocketLedger = client.db('pocketLedger')
const users = pocketLedger.collection('users');
const transactions = pocketLedger.collection('transactions')
app.use(express.json())
const authMiddleware =(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Authentication Required"})
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        res.status(401).json({message:"Token Required"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next();
    }catch(err){
        return res.status(401).json({message:"Token Invalid or Expired Token"})
    }
}
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
app.get('/api/transactions',authMiddleware,async(req,res)=>{
    try{
        const userId = req.user.userId;
        const userTransactions = await transactions.find({userId:userId}).toArray();
        res.status(200).json(userTransactions);

    }catch(err){
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
})
app.post('/api/transactions',authMiddleware,async(req,res)=>{
    const {title,category,description,date,amount,type} = req.body;
    const transaction = {title,category,description,date,amount,type,userId:req.user.userId};
    await transactions.insertOne(transaction);
    res.status(201).json({message:"Transaction created"});
})
app.delete('/api/transactions/:id',authMiddleware,async(req,res)=>{
    try{
        const transactionId = req.params.id;
        const userId = req.user.userId;
        const result = await transactions.deleteOne({_id:new ObjectId(transactionId),userId:userId});
        if(result.deletedCount ==0){
            return res.status(404).json({message:"Transaction not found"});
        }
        res.status(200).json({
            message: "Transaction deleted successfully"
        });
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
})
app.patch('/api/transactions/:id',authMiddleware,async(req,res)=>{
    try{
        const tid = req.params.id;
        const userId = req.user.userId;
        const { title, category, description, date, amount, type } = req.body;
        const result = await transactions.updateOne(
            {
                _id:new ObjectId(tid),
                userId:userId
            },
                {
                $set: {
                    title,
                    category,
                    description,
                    date,
                    amount,
                    type
                    }
                }

        );
        if(result.matchedCount===0){
            return res.status(404).json({
                message: "Transaction not found"
            });
        }
        res.status(200).json({
            message: "Transaction updated successfully"
        });
    }catch(err){
         console.log(err);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
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
        const token = jwt.sign(
            {userId : existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn:"3h"}

        )
        
        res.json({message:"Log in Successful", "token":token})
    }catch(err){
        res.json({message:"Internal Server Error"});
    }
})
app.listen(PORT,()=>{
    console.log(`server running on port ${5000}`)
})