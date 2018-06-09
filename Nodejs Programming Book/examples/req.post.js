var http = require("http")
var fs = require("fs")
http.createServer(function(req,res){
    
    if(req.method =="GET"){
        fs.readFile("./HTMLpage.html",(err,data)=>{
            if(err) console.log(err)
            res.writeHead(200,{"Content-Type" : "text/html"})
            res.end(data)
        })
    }else if(req.method=="POST"){
     
        req.on("data",function(data){
            console.log(data)
            res.writeHead(200,{"Content-Type" : "text/html"})
            res.end(`<h1>${data}</h1>`)
        })
    }
}).listen(3000,function(){
    console.log("Connected, 3000 port!")
})