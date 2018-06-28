var express = require("express")
var app = express();
var http = require("http").Server(app)
var io = require("socket.io")(http)

app.get("/",(req,res)=>{
    res.sendfile('exso.html')
})

io.on("connection",function(socket){
    console.log("user connected")
})

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
  
http.listen(3000,function(){
    console.log("A")
})