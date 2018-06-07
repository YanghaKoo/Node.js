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
    saveUninitialized: true, // 나머지는 그냥 false, true 해주면 됨
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





app.get("/auth/register", (req, res) => {
  var output = `
    <h1>Register</h1>
    <form action="/auth/register" method="post">
        <p>
            <input type="text" name="username" placeholder="username">    
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
        <input type="text" name="displayName" placeholder="displayName">
        </p>
        <p>
            <input type="submit">
        </p>
    
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

    users.push(user);

    //회원가입 하자마자, 로그인 시키기
    req.login(user, function(err){
        req.session.save(function() {
            res.redirect("/welcome");
          });
    })   
  });
});

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



//passort.use 한 후에 그 위에다가 시리얼,디시리얼 해줘
// 아래의 콜백함수에서 done의 두번째 인자가 false가 아니라면(로그인ㅇ ㅣㄴ증에 성공 했다면)
// 그러면 패스포트의 시리얼라이즈 유저라는 함수를 통해서 등록한 콜백함수가 실행되도록 약속이 되어있다!!
// 그 콜백함수의 첫번째 인자인 user는 이전 콜백함수에서 2번째 인자인 user임!!
// 이전에 2번째 인자로 전달된 user로 약속되어 있음!!!!
//이렇게 하면 세션에 user.username이라는 유일한 식별자가 세션에 저장이 됨!!!
// 그러면 사용자가 로그인을 성공해서 시리얼라이즈 유저라는 콜백함수가 실행되어서 -> user.username이라는 식별자가 세션에 등록이 됨
// 다음에 방문할 때도 세션정보로 아이디가 저장되어 있는 상태지
passport.serializeUser(function(user, done) {
    console.log("시리얼라이즈 유저" + user)
    done(null, user.username);  // 이 done의 2번째 인자는 user객체에서 유일하게 식별하는 속성을 넣어주면 됨, id나 username
  });
  


//그러면 deserializeUser는 뭐냐면 지금 로그인한 사용자의 세션에 user.username이 저장되어 있다면
// 그 다음부터 사용자가 접근(페이지에 들어올 때)할 때는 디시리얼라이즈 유저에 저장되어있는
// 콜백함수가 실행되도록 약속, 
// 그리고 이 콜백함수의 첫번째 인자인 id는 시리얼라이즈 유저의 user.username이 된다.
// 이 id값을 이용해서 사용자를 검색하는 작업을 해야함
// 그게 반복문을 돌려서 찾는것
passport.deserializeUser(function(id, done) {
    console.log("디시리얼라이즈" + id)
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        if(user.username === id){
            done(null, user);
            console.log("ss" + user.password)
        }
    }
  });


// 여기에 아래의 로컬에서 구체적인 로컬전략을 등록
// 로컬이란 스트레티지 전략을 만드는 것(객체를 만드는 것(new))
// 사용자가 아래의 미들웨어 가 실행이 될 때 local이란게 들어가니까
// passprot는 new localstartegy라는 객체를 사용해서 로그인 과정을 수행하게 됨
// 로컬스트레티지 안의 콜백함수가 동작하도록 약속되어 있는것
passport.use(
  new LocalStrategy(function(username, password, done) {
    // done에는 함수가 담겨있어
    
    var uname = username;
    var pwd = password;

    for (var i = 0; i < users.length; i++) {
      var user = users[i];

      if (uname === user.username) {
        return hasher({ password: pwd, salt: user.salt }, function(
          err,
          pass,
          salt,
          hash
        ) {
          if (hash === user.password) {
            console.log("로컬스트리티지" + user)
            done(null, user); // 로그인에 성공했을 때, done에 첫인자로는 null을 주고, 두번째 인자로는 로그인이 된 사용자에 정보를 담고있는 객체를 주면 나머지 코드는 필요없음
          } else {
            // 사용자가 틀렸다면
            done(null, false); // done에 null,false로 하면 로그인 절차가 끝났는데 실패했단 뜻임
          }
        });
      }
    }
    // 유저네임과 일치하는 것이 없다면
    done(null, false);
  })
);
//결론 : 로그인이 성공한 로직 부분에는 done(null,user객체) 실패한 부분에는 done(null,false)

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/welcome", //로그인에 성공했다면 보낼 곳
    failureRedirect: "/auth/login", //로그인에 실패했다면 보낼 곳
    failureFlash: false //인증에 실패했습니다 라는 메세지를 보내려면
  })
);

//얘를 기존 콜백(req,res) 대신에 패스포트에 위임
// app.post("/auth/login", (req, res) => {
//   var uname = req.body.username;
//   var pwd = req.body.password;

//   for (var i = 0; i < users.length; i++) {

//     var user = users[i];

//     if (uname === user.username) {
//        return hasher({ password: pwd, salt: user.salt }, function(
//         err,
//         pass,
//         salt,
//         hash
//       ) {
//         if (hash === user.password) {
//           req.session.displayName = user.displayName;
//           req.session.save(function() {
//              return res.redirect("/welcome");
//           })
//         } else {
//           res.send("Who are you nigga? <a href='/auth/login'>login</a>");
//         }
//       });
//     }

//   }
//   res.send("Who are you niggaaaaaaaaaa? <a href='/auth/login'>login</a>");
// });

app.get("/welcome", (req, res) => {
  if (req.user && req.user.displayName) {
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
