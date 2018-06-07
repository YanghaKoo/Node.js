var app = require("./config/mysql/express")();
var passport = require("./config/mysql/passport")(app);
var topic = require("./routes/mysql/topic")(app)
app.use("/topic",topic)



var auth = require("./routes/mysql/auth")(passport);
app.use("/auth", auth);

app.listen(3000, function() {
  console.log("Connected, 3000 port!");
});
