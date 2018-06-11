var express = require("express")
var app = express();
var logger = require("morgan")



app.use(express.static("public"))


app.use(function(req,res){
    res.send("Hi, <img src='image.jpg'>")
})

app.listen(3000,function(){
    console.log("Connected 3000 port!")
})