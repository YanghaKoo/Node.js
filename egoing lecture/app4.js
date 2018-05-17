// npm init, npm install express --save
var express = require('express')
var app = express()

//사진, html파일이 들어있는 public 폴더를 만든 후
app.use(express.static('public'))

//introdue페이지를 위해 해줘야 하는 것들, npm install jade --save
app.set("view engine", "jade")
app.set("views", "views") // 폴더이름 views

//post 방식 사용을 위해 bodyparser npm인스톨 한 후
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))

app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to HomePage!</h1>
    <a href="/introduce">About me</a> <br>
    <a href="/form">submit Resume</a> <br>
    <a href="/topic/0">topics</a>      <br>
    <a href=""></a>     <br>
    `)
})

app.get('/skpic',(req,res)=>{
    res.send(`<h1>This is my gf picture!</h1>
                <img src="/abc.jpg">
                `)
})

app.get('/introduce',(req,res)=>{
    res.render("introduce")
})


app.get('/topic/:id',(req,res)=>{
    var topics = ["javascript is...", "nodejs is...", "express is..."]
    var output = `
        <a href="/topic/0">Javascript</a>    <br>
        <a href="/topic/1">Node</a>    <br>
        <a href="/topic/2">Express</a>    <br><br>

        ${topics[req.params.id]}
    `
    res.send(output)
})

app.get('/form', (req,res)=>{
    res.render('resume')
})


app.get('/form_receiver',(req,res)=>{
    var title = req.query.title
    var des = req.query.des
    res.send(`지원자 이름 : ${title} <br>
    지원서 내용 : ${des}`)
})

app.post('/form_receiver',(req,res)=>{
    var title = req.body.title
    var des = req.body.des
    res.send(`지원자 이름 : ${title} <br>
    지원서 내용 : ${des}`)
    
})



app.listen(3000,function(){
    console.log("port 3000 connected!")
})


