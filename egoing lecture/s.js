var express = require("express");
var session = require("express-session");

var FileStore = require("session-file-store")(session);

var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var app = express();

app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true // 나머지는 그냥 false, true 해주면 됨
    //store: new FileStore()
  })
);

app.use(passport.initialize());
app.use(passport.session());
// 세션을 써야하는데 세션코드가 앞에 없으면 오류가 남

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var users = [
  {
    username: "a",
    password:
      "rWV47MgukPnCIcwMjNXOEsYf8b+6JLiGdDOcX5vcUrEhs5KIAOX5la+y43xtOoXYzxOxulTLIh26SAwEb7q1u7Q6hP1Iboj7fkWhSQPQFBriYYXYuJ3Cthw/g63rxRVKbTvkMHjGOqiu3v6lMKn1UO3Q2lKYVUlGx0J3AfPUyMo=", // 111
    salt:
      "rHql9p+ctzKMc1URXZr/3iWtgRWiv6nEYoPOeP/2XBscjmEFPqhRPRSeNPSkDAEe8UF+fdQwyywYmUlNKmLm9Q==",
    displayName: "Yangha"
  }
];


















passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  for (var i = 0; i < users.length; i++) {
    if (id === users[i].username) {
      done(null, users[i]);
      console.log(users[i].displayName);
    }
  }
  
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    for (var i = 0; i < users.length; i++) {
      if (username === users[i].username) {
        return hasher({ password: password, salt: users[i].salt }, function(
          err,
          pass,
          salt,
          hash
        ) {
          if (hash === users[i].password) {
            done(null, users[i]);
          } else {
            done(null, false);
          }
        });
      }
    }
    done(null, false);
  })
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/auth/login",
    failureFlash: false
  })
);
