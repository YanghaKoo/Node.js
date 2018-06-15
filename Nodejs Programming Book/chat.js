const express = require("express")
const http = require("http")
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = socketio.listen(server)

app.use(express.static("public"))

io.sockets.on("connection", socket =>{
   


    socket.on("mess",(data)=>{
        console.log(data)
        io.sockets.emit("message",data)
    })

})




server.listen(3000,()=>{
    console.log("3000 connected")
})