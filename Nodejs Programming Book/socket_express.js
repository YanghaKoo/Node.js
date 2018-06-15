// 모듈 추출
const socketio = require("socket.io");
const express = require("express");
const http = require("http"); // socket과 express를 같이 쓰려면 http가 필수적으로 필요함

// 객체 선언
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//미들웨어 설정
app.use(express.static("public"));

//웹 소캣을 설정
io.sockets.on("connection", socket => {
  // 클라이언트에서 join이라는 이벤트가 발생했을 때!

  //변수 선언
  let roomName = null;

  // 클라이언트를 방에 배정합니다
  socket.on("joinABCD", data => {
    roomName = data.roomName;
    socket.join(data.roomName) // 이 내가 입력한 방 이름으로 묶음
  });

//클라이언트에서 데이터가 전달되면 배분합니다.
  socket.on("message", data=>{
        console.log(data.message)
        io.sockets.to(roomName).emit('message',{
        message : "From Server"
      })
  })





});

//서버 실행
server.listen(3000, () => {
  console.log("Server running at 3000 port!");
});
