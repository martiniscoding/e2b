import express from "express"
const app= express()

app.use(express.json())
app.get("/", (req,res)=>{
    res.json({
        msg:"hello"
    })
})

app.listen(3000,()=>{
    console.log(`server started at 3000`)
})