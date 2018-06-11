var express = require("express")
var app = express();


app.use(function(req,res,next){
    console.log("첫번째 미들웨어")
    res.numb = 30
    next()
})

app.use(function(req,res,next){
    console.log("두번째 미들웨어")
    res.numb++;
    next();
})

app.use(function(req,res,next){
    console.log("세번째 미들웨어")
    next();
    res.send(`${res.numb}`)
})


app.listen(3000,function(){
    console.log("Connected 3000 port!")
})