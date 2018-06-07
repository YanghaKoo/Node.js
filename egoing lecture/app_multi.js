var express = require("express");
var session = require("express-session");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


app.use(
  session({
    secret: "ilovesukyung", //이 부분은 우리가 만든 에플리케이션이 세션 id를 사용자의 웹브라우저에 심을 때, 암호화 해주는 코드(랜덤한 값, 쿠키세팅과 같은)
    resave: false,
    saveUninitialized: true // 나머지는 그냥 false, true 해주면 됨
  })
);

var users = [
    {
        username : "yangha93",
        password : "qwerqwer",
        displayName : "구과인"
    },
    {
        username : "su93",
        password : "qwerqwer",
        displayName : "쑥경"
    }

]


app.get("/welcome", (req, res) => {
  if (req.session.displayName) {
    res.send(`<h1>Hi, ${req.session.displayName} <a href="/auth/logout">logout</a></h1> `);
  } else {
    res.send(`
        <h1>Welcome</h1>
        <ul>
            <a href="/auth/login"><li>Login</li></a>
            <a href="/auth/register"><li>Register</li></a>
        </ul>
        `);
  }
});

app.get("/auth/logout",(req,res)=>{
    delete req.session.displayName
   
        res.redirect("/welcome")
   
})

app.get("/auth/register",(req,res)=>{

    res.send(`
    <h1>Register</h1>
    <form action="/auth/register" method="post">
    <p>
    <input type="text" placeholder="username" name="username" required>
    </p>
    <p>
    <input type="password" placeholder="password" name="password" required>
    </p>
    <p>
    <input type="text" placeholder="displayName" name="displayName" required>
    </p>
    <input type="submit" value="Submit">
    
    </form>
    `)
})

app.post("/auth/register",(req,res)=>{
    var uname = req.body.username
    var pw = req.body.password
    var dn = req.body.displayName

    users.push({
        username : uname,
        password : pw,
        displayName : dn
    })

    res.redirect("/welcome")
})


app.get("/auth/login",(req,res)=>{
    res.send(`
    <h1>Login</h1>
    <form action="/auth/login" method="post">
    <p>
    <input type="text" placeholder="username" name="username">
    </p>
    <p>
    <input type="password" placeholder="password" name="password">
    </p>
    <input type="submit">
    </form>
    `)
})

app.post("/auth/login",(req,res)=>{
    var id = req.body.username
    var pw = req.body.password

    for(var i = 0; i<users.length; i++){
        if(id===users[i].username && pw === users[i].password){
            req.session.displayName = users[i].displayName
            res.redirect("/welcome")
        }
    }

    res.send("Who are you? <a href='/auth/login'>login</a>")


})



app.listen(3000, function() {
  console.log("connected 3000 port!");
});
