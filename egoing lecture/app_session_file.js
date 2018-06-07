var express = require("express");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var app = express();

app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true, // 나머지는 그냥 false, true 해주면 됨
    store: new FileStore()
  })
);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/auth/login", (req, res) => {
  var output = `
  <h1>Login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">    
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    
    </form>
    `;
  res.send(output);
});

app.post("/auth/login", (req, res) => {
  var user = {
    username: "a",
    password: "a",
    displayName: "Yangha"
  };
  var uname = req.body.username;
  var pwd = req.body.password;

  if (uname === user.username && pwd === user.password) {
    req.session.displayName = user.displayName;
    res.redirect("/welcome");
  } else {
    res.send("Who are you nigga? <a href='/auth/login'>login</a>");
  }
});

app.get("/welcome", (req, res) => {
  if (req.session.displayName) {
    res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);
  } else {
    res.send(`
            <h1>Welcome</h1>
            <a href="/auth/login">login</a>
        `);
  }
});

app.get("/auth/logout", (req, res) => {
  delete req.session.displayName;
  res.redirect("/welcome");
});

app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    // 카운트라는 값을 서버에 1로 저장하고 브라우저에서 접속한 사용자와 연결을 시키는것임
    req.session.count = 1;
  }

  res.send("Count : " + req.session.count);
});

app.get("/tmp", (req, res) => {
  res.send("result : " + req.session.count);
});

app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
