var express = require("express");

var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var app = express();

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "o2"
});
conn.connect();

app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true, // 나머지는 그냥 false, true 해주면 됨
    store: new MySQLStore({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "satul213",
      database: "o2"
    })
  })
);

app.set("view engine", "jade");
app.set("views", "./views_mysql/mysql");


app.use(passport.initialize());
app.use(passport.session());
// 세션을 써야하는데 세션코드가 앞에 없으면 오류가 남

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));



app.get("/auth/register", (req, res) => {
    res.render("./auth/register")
});

app.post("/auth/register", (req, res) => {
  hasher({ password: req.body.password }, function(err, pass, salt, hash) {
    var user = {
      username: req.body.username,
      password: hash,
      salt: salt,
      displayName: req.body.displayName
    };

    var sql = "INSERT INTO users SET ?";
    conn.query(sql, user, function(err, results) {
      if (err) {
        console.log("ERROR");
      }
      res.redirect("/welcome");
    });
  
  });
});

app.get("/auth/login", (req, res) => {
  res.render("./auth/login");
});




passport.serializeUser(function(qw, done) {
  //console.log(user)
    done(null, qw.id); // 이 done의 2번째 인자는 user객체에서 유일하게 식별하는 속성을 넣어주면 됨, id나 username
});

passport.deserializeUser(function(id, done) {
    var sql = "select * from users where id=?";
  conn.query(sql, [id], function(err, abc) {
    done(null, abc[0]);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {

    var sql = "select * from users where username=?";
    conn.query(sql, [username], function(err, results) {
      if (err) {
        return done("There is no User", false);
      } else {
        
        
        var user1 = results[0];
        return hasher({ password, salt: user1.salt }, function(
          err,
          pass,
          salt,
          hash
        ) {
          if (hash === user1.password) {
            done(null, user1);
          } else {
            done(null, false);
          }
        });
      }
    });
  })
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/welcome", //로그인에 성공했다면 보낼 곳
    failureRedirect: "/auth/login", //로그인에 실패했다면 보낼 곳
    failureFlash: false //인증에 실패했습니다 라는 메세지를 보내려면
  })
);

app.get("/welcome", (req, res) => {
  if (req.user && req.user.displayName) {
    console.log(`${req.user}111111111111111111111111111111`)
    res.send(`
            <h1>Hello, ${req.user.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);
  } else {
    res.send(`
            <h1>Welcome</h1>
            <ul>
            <li><a href="/auth/login">login</a></li>
            <li><a href="/auth/register">register</a></li>
            </ul>
            
        `);
  }
});

app.get("/auth/logout", (req, res) => {
  //세션에 데이터를 제거
  req.logout();
  req.session.save(function() {
    res.redirect("/welcome");
  });
});






app.listen(3000, function() {
  console.log("Connected 3000 port!");
});
