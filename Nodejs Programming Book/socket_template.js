const socketIo = require("socket.io")
const express = require("express")
const http = require("http")

const app = express()
const server = http.createServer(app)
const io = socketIo.listen(server)

app.use(express.static("public"))


// 웹 소켓을 설정합니다
io.sockets.on('connection',function(socket){




    
})


server.listen(3000,function(){
    console.log("port connected!")
})