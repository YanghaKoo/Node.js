// public/test1.html 과 연결
const express = require("express");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo.listen(server);

app.use(express.static("public"))

var seats = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];



// 얘에 있는 data를 ajax로 받아올 것이므로 seats를 그대로 res.send로 출력 ( JSON 형식 )
app.get("/seats",function(req,res){
    res.send(seats)
})

io.sockets.on("connection", function(socket) {
    
    socket.on("reserve",function(data){
        seats[data.y][data.x] = 2 // 예약 완료된 좌석의 좌표를 2로 변경
        io.sockets.emit("reserve", data) // 바뀌지 않은 data를 reserve 이벤트로 보냄
    })

    // 예약 취소 추가구현
    socket.on("cancle",function(data){
        seats[data.y][data.x] = 1
        io.sockets.emit("cancle", data)
    })


});

server.listen(3000, function() {
  console.log("3000 CN");
});
