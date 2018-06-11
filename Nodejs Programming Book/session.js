var express = require("express");
var app = express();
var cookieParaser = require("cookie-parser");
var session = require("express-session");

app.use(cookieParaser());
app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true // 나머지는 그냥 false, true 해주면 됨
  })
);

app.get("/", (req, res) => {
  var output = {};
  output.cookies = req.cookies;
  output.session = req.session;

  req.session.now = new Date().toUTCString();
  res.send(output);
});

app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
