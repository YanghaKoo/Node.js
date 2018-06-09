var http = require("http")
var fs = require("fs")
var url = require("url")

http.createServer(function(req,res){

    var pathName = url.parse(req.url).pathname;
    if(pathName == "/"){
     fs.readFile("./index.html",(err,data)=>{
         res.end(data)
     })   
    }else if(pathName == "/OtherPage"){
        fs.readFile("./OtherPage.html",(err,data)=>{
            res.end(data)
        })
    }

}).listen(3000,function(){
    console.log("Connected!")
})