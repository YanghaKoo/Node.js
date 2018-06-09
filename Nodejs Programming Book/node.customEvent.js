var events = require("events")
var custom = new events.EventEmitter();

custom.on("tick",function(){
    console.log("tick")
})

custom.emit("tick")