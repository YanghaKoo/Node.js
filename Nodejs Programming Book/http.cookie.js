var http = require("http")
http.createServer(function(req,res){
    var date = new Date();
    date.setDate(date.getDate()+7);

    res.writeHead(200,{
        'Content-Type' : 'text/html',
        'Set-Cookie' : ['brackfest = toast;Expires = '+date.toUTCString(),'dinner = chicken']
    })

    res.end(`<h1>${req.headers.cookie}</h1>`)
}).listen(3000,function(){
    console.log("Connected, 3000 port!")
})