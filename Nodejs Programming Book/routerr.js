var express = require("express")
var app = express();


app.get("/a/:id",(req,res)=>{
    var id = req.params.id
    res.send("go to a" + id)
})

app.get("/b",(req,res)=>{
    res.send("go to b")
})

app.all("*",(req,res)=>{
    res.send("page not found")
})


app.listen(3000,function(){
    console.log("Connected 3000 port!")
})