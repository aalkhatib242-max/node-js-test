const express=require("express")
const bcrypt=require("bcrypt")
const app=express()
app.set("view engine","ejs")
app.set("views",__dirname + "/views")
const mongoose=require("mongoose")
const User=require("./models/User")
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{  
console.log("connected successfully")
}).catch((error)=>{
    console.log("error with connecting with the DB",error)
})
app.use(express.json())
const port=3000

app.get("/",(req,res)=>{
    res.render("Articles.ejs")
})
const users=[]
app.post('/register', async(req,res)=>{
    try{
        const {email,password}=req.body
        const  findUser=users.find((data)=>email==data.email)
        if (findUser){
            res.status(400).send("wrong email or password!")
        }
        const hashedPassword=await bcrypt.hash(password,10)
        users.push({email,password:hashedPassword})
        console.log(users)
        res.status(201).send('Registered successfully')
    }   catch (err) {
        res.status(500).send({message:err.message}) 
        }
    }
)
app.post("/LogIn", async(req,res)=>{
    try{
        const {email,password}=req.body
        const findUser=users.find((data)=>email==data.email)
        if(!findUser){
            res.status(400).send('wrong email or password !')
        }
        const passwordMatch=await bcrypt.compare(password,findUser.password)
        if (passwordMatch){
            res.status(200).send('logged successfully')
        }
        else{
            res.status(400).send('wrong email or password !')
        }

    }catch(err){res.status(500).send({message:err.message})}
})
app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})