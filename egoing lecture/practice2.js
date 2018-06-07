var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true, // 나머지는 그냥 false, true 해주면 됨
    store: new MySQLStore({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'satul213',
        database: 'o2'
    })
  })
);

var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "satul213",
  database: "o2" // 애초에 어떠한 데이터베이스 들어갈지 명시해줌
});
conn.connect();

var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session()); 





app.get("/welcome", (req, res) => {
  if(req.user){
      var output = `Hello, ${req.user.displayName} <a href="/auth/logout">logouy</a>`
      
        res.send(output)  
      
      
  }else{


    var output = `
        <h1>Welcome</h1>
        <ul>
            <li><a href="/auth/login">login</a></li>
            <li><a href="/auth/register">register</a></li>
        </ul>
    `;
  res.send(output);}
});

app.get("/auth/login", (req, res) => {
  var output = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p><input type="text" name="username" placeholder="username"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit"></p>
        </form>
    `;
  res.send(output);
});


passport.serializeUser(function(user,done){
    done(null, user.id)
})

passport.deserializeUser(function(id,done){
    var sql = "select * from users where id=?"
    conn.query(sql,[id],function(err,results){
        done(null,results[0])
    })
})





passport.use(
  new LocalStrategy(function(username, password, done) {
    
    var sql= "select * from users"
    conn.query(sql,function(err,results){
        if(err){res.send("aaa")}
        else{
            for(var i =0; i<results.length; i++){
                if(username === results[i].username){
                    return hasher({password : password, salt : results[i].salt},function(err,pass,salt,hash){
                        if(hash === results[i].password){
                            return done(null,results[i])
                        }else{
                            return done(null,false)
                        }
                    })
                }
            }
            return done(null,false)

        }
    })




}))




app.post(
  "/auth/login",
    passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/auth/login"
  })
);

app.get("/auth/register", (req, res) => {
  var output = `
        <h1>Register</h1>
        <form action="/auth/register" method="post">
            <p><input type="text" name="username" placeholder="username"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="text" name="displayName" placeholder="displayName"></p>
            <p><input type="submit"></p>
        </form>
    `;
  res.send(output);
});

app.post("/auth/register", (req, res) => {
  hasher({ password: req.body.password }, function(err, pass, salt, hash) {
    var user = {
      username: req.body.username,
      password: hash,
      salt: salt,
      displayName: req.body.displayName
    };

    var sql = "insert into users set ?";
    conn.query(sql, user, function(err, results) {
      if (err) {
        res.send("error");
      } else {
            req.login(user,function(err){
                req.session.save(function(){
                    res.redirect("/welcome")
                })
            })



      }
    });
  });
});


app.get("/auth/logout",(req,res)=>{
    req.logout();
    req.session.save(function(){
        res.redirect("/welcome")
    })
})

app.listen(3000, function() {
  console.log("CN");
});
