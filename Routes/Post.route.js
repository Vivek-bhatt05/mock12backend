const express=require("express")
const {PostModel}=require("../Models/Post.model")
const postRouter=express.Router()



postRouter.get("/post",async(req,res)=>{
    const {category,sort, query ,page = 1, limit = 4 } = req.query;
   try{
    if (category) {
        let posts = await PostModel.find({ category })
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).send(posts);
    }
    else if (query) {
        let posts = await PostModel.find(new RegExp(query,"i"))
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).send(posts);
    }else if (sort) {
        if (sort === "asc") {
            let posts = await PostModel.find().sort({ postedAt: 1 })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send(posts);
        } else if (sort == "desc") {
            let posts = await PostModel.find().sort({ postedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send(posts);
        }
    } 
    else if (category && sort) {
        if (sort === "asc") {
            let posts = await PostModel.find({ category }).sort({ postedAt: 1 })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send(posts);
        } else if (sort == "desc") {
            let posts = await PostModel.find({ category }).sort({ postedAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.status(200).send(posts);
        }
    } 
     else{
        const posts= await PostModel.find()
        .skip((page-1)*limit)
        .limit(limit);
        res.send(posts)
    }
     
   }catch(err){
      console.log(err)
      res.send("Something Went Wrong")
   }
})

postRouter.post("/create",async(req,res)=>{
   const payload=req.body
   try{
    const newPost= new PostModel(payload)
    await newPost.save()
    res.send("Created a Post")
   }catch(err){
    console.log(err)
    res.send({"msg":"Something Went Wrong"})
   }
})



postRouter.delete("/post/:id",async(req,res)=>{ 
   const ID=req.params.id
   try{
     
         await PostModel.findByIdAndDelete({_id:ID})
         res.send("Deleted a Post")
      
  }catch(err){
     console.log(err)
     res.send("Something Went Wrong")
  }
 })


module.exports={
    postRouter
}