var express = require("express")
var app = express();
var logger = require("morgan")

app.use(logger(':req[header]'))

app.use((req,res)=>{
    res.send("<h1>Hi</h1>")
})


app.listen(3000,function(){
    console.log("Connected 3000 port!")
})