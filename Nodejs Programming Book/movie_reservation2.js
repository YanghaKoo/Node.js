const express = require('express')
const http = require('http')
const socketIo= require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo.listen(server)

app.use(express.static('public'))

let seats = [
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

  // for JSON ajax
  app.get("/seats",(req,res)=>{
      res.send(seats)
  })

io.sockets.on("connection",(socket)=>{
    socket.on("reserve",function(data){
        seats[data.y][data.x] = 2
        // 여기서 퍼블릭 통신( io.sockets.emit을 안하면 실시간 안됨 브라우저간 )
        io.sockets.emit("reserve",data)  
    })
})

server.listen(3000,()=>{
    console.log("3000port Connected!")
})
