
const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')
//middleware
const PORT=3001
const app=express()
app.use(express.json())


mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully...")
).catch(
    (err)=>console.log(err)
)


app.get('/',async(req, res)=>{
    try{ 
        res.send("<h1 align=center> Welcome to the backend and week 2</h1>")
    }
    catch(err)
    {
        console.log(err)
    }
})

app.post('/register',async(req, res)=>{
    const {user,email,password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({user,email,password:hashPassword})
        await newUser.save()
        console.log("New user is registered successfully...")
        res.json({message:'User created...'}) 
    
    }
    catch(err)
    {
        console.log(err)
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password,user.password)))
            {
              return res.status(400).json({ message: "Invalid Credentials"});
            }
           res.json({ message: "Login Successful", username: user.usernmame});
      
    }
    catch(err)
    {
        console.log(err)
    }
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("Server is running on port | This sowmiya : "+PORT)
})