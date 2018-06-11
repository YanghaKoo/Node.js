var express = require("express")
var app = express();


app.use((req,res)=>{
    res.send(404,"<h1>Error!</h1>")     // 404가 status code
})


app.listen(3000,function(){
    console.log("Connected 3000 port!")
})