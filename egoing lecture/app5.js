var express = require(`express`)
var app = express()

app.use(express.static('public'))

// jade 사용을 위해서
app.set("view engine","jade")
app.set("views","views")


//post 방식을 사용하기 위한 미들웨어 설치
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))


//기본 홈페이지 + 네비게이터
app.get('/',function(req,res){
    res.send(`<h1>Welcome to Homepage</h1><br>

        <a href="/introduce">about me</a><br>
        <a href="/gf">about SuKyung</a><br>
        <a href="/topic2/0">out Topics</a><br>
        <a href="/resume">write Resume</a><br>
    `)
})

//이미지 로딩
app.get('/gf',function(req,res){
    res.send(`<h1>This is my girl friend</h1>
        <img src="abc.jpg" width="450px" height="300px">
    `)
})

app.get("/introduce",(req,res)=>{
    res.render("introduce", {time : new Date()})
})



// queryString 방식으로 하면
app.get("/topic",(req,res)=>{
    var topics= ["javascript is...", "nodejs is...", "express is..."]
    var output = `
        <a href="/topic?id=0">자바스크립트</a><br>
        <a href="/topic?id=1">노드</a><br>
        <a href="/topic?id=2">익스프레스</a><br><br>
        <b>${topics[req.query.id]}</b>
    `
    res.send(output)
}) 

//시멘틱 url 방식
app.get("/topic2/:id",(req,res)=>{
    var topics= ["javascript is...", "nodejs is...", "express is..."]
    var output = `
        <a href="/topic2/0">자바스크립트</a><br>
        <a href="/topic2/1">노드</a><br>
        <a href="/topic2/2">익스프레스</a><br><br>
        
        <b>${topics[req.params.id]}</b>
    `
    res.send(output)
})

//get 방식으로 인한 정보의 전달

app.get("/resume",(req,res)=>{
    res.render("resume2")
})

app.post("/resume_receive",(req,res)=>{
    var name = req.body.name
    var des = req.body.des

    res.send(`지원자 : ${name} <br>
    이력서 내용 : ${des}`)
})












app.listen(3000,function(){
    console.log("port 3000 connected")
})