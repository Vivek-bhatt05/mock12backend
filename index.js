const express= require("express")
const {connection}=require("./config/db");
const { postRouter } = require("./Routes/Post.route");


const app=express();
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/",postRouter)



app.listen( 4000 ,async()=>{

    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Error while connecting")
        console.log(err)
    }

    console.log("Port is running")
})