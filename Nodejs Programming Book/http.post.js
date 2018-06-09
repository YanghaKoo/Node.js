var http = require("http")
http.createServer(function(req,res){

    req.on("data",function(data){
        console.log(`POST data : ${data}`)
    })


}).listen(3000,function(){
    console.log("Connected, 3000 port!")
})