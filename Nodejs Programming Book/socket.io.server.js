var http = require("http");
var fs = require("fs");
var socketio = require("socket.io");

var server = http
  .createServer(function(req, res) {
    fs.readFile("./HTMLpage.html", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(3000, function() {
    console.log("aaaa");
  });

    //소켓 서버 생성
    // 연결하는 부분이 이부분이랑
  //여기서의 변수명 io는 바뀌어도 됨!!
  // 아래 io.sockets.on의 io만 같이 바꿔주면 됨
var io = socketio.listen(server);

io.sockets.on("connection", function(socket) {
  console.log("io.connection");

  socket.on("rint", function(data) {
    console.log("Clinet Send Data : ", data);
    socket.emit("smart", data);
  });
});
