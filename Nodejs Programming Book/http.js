var fs = require("fs")
var http = require("http")

http.createServer(function(req,res){
    fs.readFile("./image/sample.jpg",(err,data)=>{
        if (err) console.log(err)
        else{
            res.writeHead(200,{"Content-Type" : "image/jpeg"})
            res.end(data)
        }
    })


}).listen(3000,function(){
    console.log("Server running at 3000")
})

http.createServer(function(req,res){

}).listen(3003,function(){
    console.log("Server running at 3003")
})
