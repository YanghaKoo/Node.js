var http = require("http")
http.createServer(function(req,res){
    
    var cookie = req.headers.cookie;

    res.writeHead(200,{'Content-Type':"text/html", "Set-Cookie": ['name=Rint', "region=seuul"]})

    res.end(`<h1>${JSON.stringify(cookie)}</h1>`)
}).listen(3000,function(){
    console.log("aa")
})