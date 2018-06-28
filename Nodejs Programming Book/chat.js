// public 폴더의 chat.html과 연결
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql");

const app = express();
const server = http.createServer(app)
const io = socketIo.listen(server)


var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "bs"        
});
conn.connect();
app.use(express.static("public"))






io.sockets.on("connection",(socket)=>{


    // 클라이언트 쪽에서 prompt로 입력받은 chatRoom의 이름으로 방을 생성시킵니다
    let chatRoom = null
    socket.on("chatRoom",function(data){
        chatRoom = data.chatRoom
        socket.join(data.chatRoom)
    })



    // 여기서의 data를 DB에 넣자
    socket.on("message",function(data){
        let sql = "insert into chat (name, content) values (?,?)"
        conn.query(sql,[data.name,data.content],function(error,results){
            if(error) console.log("DB insert Err")
            else console.log("DB insertion completed!")
        })

        // 수정 전 : public 데이터 통신을 위해 io.sockets종.emit()
        //io.sockets.emit("print",data)

        // 수정 후 : 특정 방에 조인한거만
        io.sockets.in(chatRoom).emit("print",data)
    })
})

server.listen(3000,function(){
    console.log("Connected!")
})