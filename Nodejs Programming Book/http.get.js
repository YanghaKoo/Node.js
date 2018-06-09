var http = require("http")
var url = require("url")
http.createServer(function(req,res){
    var query = url.parse(req.url).query
    
    res.writeHead(200,{"Content-Type" : "text/html"})
    res.end(`<h1>${query}</h1>`)


}).listen(3000,function(){
    console.log("Connected, 3000 port!")
})