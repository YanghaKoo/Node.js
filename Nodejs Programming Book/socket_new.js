const socketIo = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

app.use(express.static("public"));

// 웹 소켓을 설정합니다
io.sockets.on("connection", function(socket) {
    
    let roomName = null

    // 클라이언트에서 joinABCD 이벤트가 발생했을 때
    // 얘는 클라이언트에서 보낸 roomName을 받아서 그 이름의 방에다 넣음
    socket.on("joinABCD",(data)=>{
        roomName = data.roomName
        socket.join(data.roomName)
    })


    socket.on("message",function(data){      
        io.sockets.in(roomName).emit("message",{
            message : "From Server"
        })
    })
})

server.listen(3000, function() {
  console.log("port connected!");
});
