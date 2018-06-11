var express = require("express");
var app = express();
var cookieParser = require("cookie-parser")

app.use(cookieParser())



app.get("/getcookie",(req,res)=>{
    res.send(req.cookies)
})


app.get("/setcookie",(req,res)=>{
    res.cookie("string","hi im yangha")
    res.cookie("JSON",{
        name : "cook",
        age : 25
    })
    res.redirect("/getcookie")
})




app.listen(3000,function(){
    console.log("connected 3000port!")
})
