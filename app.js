const express=require("express")
const app=express()
const mongoose=require("mongoose")
const Article=require("./models/Article")
mongoose.connect("mongodb+srv://AliAlkhatib10:AliAlkhatib2003@myfirstcluster.r46sloy.mongodb.net/?retryWrites=true&w=majority&appName=MyFirstCluster")
.then(()=>{
console.log("connected successfully")
}).catch((error)=>{
    console.log("error with connecting with the DB",error)
})
app.use(express.json())
const port=3000


app.get("/hello",(req,res)=>{
    res.json({
        name:req.body.name,
        age:req.query.age
    })
})
app.get("/1",(req,res)=>{
    let num=""
    for (let i=0;i<=100;i++){
    num+=i+" "
    
    }
    res.send(`the numbers are : ${num}`)
})
app.get("/2/:num1/:num2",(req,res)=>{
    let num1=req.params.num1
    let num2=req.params.num2
    let total=Number(num1)+Number(num2)
    res.send(`the total is : ${total}`)
})
app.get("/3",(req,res)=>{
    let num1=req.body.num1
    let num2=req.body.num2
    let total=Number(num1)+Number(num2)
    // res.send(`the total is : ${total}`)
res.render("index.ejs",{
    total:total
})
})
app.get("/4",(req,res)=>{
    let num1=req.query.num1
    let num2=req.query.num2
    let total=Number(num1)+Number(num2)
    res.send(`the total is : ${total} and your name is : ${req.body.name}`)
})
app.get("/5",(req,res)=>{
    
    // res.sendFile(__dirname+"/html/index.html")
    res.render("index.ejs",{
        name:"Alloush",
    })
})
app.post("/add",(req,res)=>{
    res.send("post request on add")
})
app.delete("/delete_me",(req,res)=>{
    res.send("visiting delete request")
})


app.post("/Articles",async (req,res)=>{
    const newArticle=new Article()
    const artTitle=req.body.articleTitle
    const artBody=req.body.articleBody
    res.send(artTitle+" "+artBody)

    newArticle.title=artTitle
    newArticle.body=artBody
    newArticle.numberOfLikes=0
    await newArticle.save()
    res.json(newArticle)
})
app.get("/Articles",async(req,res)=>{
    const articles=await Article.find()
    res.json(articles)
})
app.delete("/Articles/:aa",async(req,res)=>{
    const id=req.params.aa
    const delete_me=await Article.findByIdAndDelete(id)
    res.json(id)
})
app.get("/showArticles",async(req,res)=>{
    const Articles=await Article.find()
    res.render("Articles.ejs",{
        AllArticles:Articles
    })
})
app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})