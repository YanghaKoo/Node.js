const express = require("express");
const bodyParser = require("body-parser")
const app = express();


app.set("view engine", "jade");
app.set("views", "views");
app.use(express.static("public")); // public 이란 폴더에!
app.use(bodyParser.urlencoded({extended : false}))



app.get("/", function(req, res) {
  res.send('Home Page, <img src="./abc.jpg">  ');
});

app.get("/sk", (req, res) => {
  res.send("asddf");
});

app.get("/template", (req, res) => {
  res.render("temp", { sk: "Example String" });
});

app.get("/topic/:id", function(req, res) {
  var topics = ["Javascript is...", "Nodejs is...", "Express is..."];

  var output = `
        <a href='/topic/0'>JavaScript</a><br>
        <a href='/topic/1'>Nodejs</a><br>
        <a href='/topic/2'>Express</a><br><br>
        
        ${topics[req.params.id]}
    `;
  res.send(output);
});


app.get("/form",(req,res)=>{
    res.render("form")
})

app.get("/form_receiver", (req,res)=>{
    var title = req.query.title
    var des = req.query.des

    res.send(`${title},  ${des}`)
})

//body parser가 필요!!! 플러그인, <미들웨어>, 확장기능
app.post("/form_receiver",(req,res)=>{
    var title = req.body.title
    var des = req.body.des
    res.send(`${title}, ${des}`)

})





app.listen(3000, function() {
  console.log("port 3000 connected!");
});

