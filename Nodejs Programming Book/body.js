var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var fs = require("fs");

app.use(cookieParser());
app.use(bodyParser());
//app.use(bodyParser.urlencoded({extended : false}))

app.get("/", (req, res) => {
  if (req.cookies.auth) {
    res.send("<h1>Login Success</h1>");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  fs.readFile("./login.html", (err, data) => {
    console.log(JSON.stringify(data));
    res.send(data.toString());
  });
});

app.post("/login", (req, res) => {
  var login = req.body.username;
  var password = req.body.password;

  console.log(req.body);

  if (login == "a" && password == "a") {
    res.cookie("auth", true);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
