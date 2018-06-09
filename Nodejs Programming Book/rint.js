var events = require("events");

module.exports.timer = new events.EventEmitter();


setInterval(function() {
  module.exports.timer.emit("tick");
}, 1000);
