var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

var sessionStore = new MySQLStore({});

app.use(cookieParser());
app.use(
  session({
    secret: "123123123123123",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  console.log(req.session);

  res.send("hi ss" + req.session.count);
});

app.listen(3000, function() {
  console.log("CC");
});
