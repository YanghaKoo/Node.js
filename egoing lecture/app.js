var express = require('express')
var app = express(); // 우리가 가져온 모듈(express)는 사실 함수여서 실행시켜서 리턴을 해줘야함
                     // 여기까진 원리가 없이 그냥 만든사람이 이렇게 만드는거

app.locals.pretty = true
app.set('view engine', 'jade');
app.set('views','./views')  // 템플릿 엔진을 설정하는 과정(약속), 뒤의 ./views는 관용적인 폴더이름


app.get("/template", function (req,res) {
    res.render('temp',{time : new Date(), title : "제목"});                   //템플릿 엔진을 사용할 떄는 render()를 사용,temp.jade를 보여주겠따. , 두번째 인자로는 .jade파일에서 쓸 변수를 넣어줘
  })


//사진, html 등의 파일 넣기!
//정적인 파일이 위치한 디렉토리를 지정하는 기능
app.use(express.static('public')) // public은 디렉토리 이름
                                  // public이라는 디렉토리에 정적인 파일들을 넣어 놓겠다.




// listen먼저 하고 get했음 순서상으로는
app.get('/', function(req,res){ //res응답에 대한객체, req리퀘스트에 대한 객체 이건 정해져있음 
    res.send("Hello home page") //2번째 인자인 res는 센드라는 메소드를 가짐, 인자값을 응답할 것이다
})           // get은 url을 직접 치고 접속한 사용자를 위해 있는 것      사용자가 홈으로 접속하면, 우리가 2번째로 전달한 함수가 실행된다!!!!!!!!!!!!! '/'이 홈을 의미
// get으로 /abc 하면 url/abc주소로 갔을 때 어떤 작업을 할 지 보여줌



//이렇게 이미지를 넣을 수 있는데 주의할 점은 경로에 public이 안들어 간다는 점과, img태그에 닫는 태그가 없다는 것
app.get('/test', function(req,res){
    res.send('Hello Router, <img src="abc.jpg">')
})

    

//  /로긴 페이지로 접속하면 login please를 나타냄
// 사용자가 어떠한 경로로 들어 왔을 때 어떤 것이 실행될 것인가 라고 하는 것을 연결해주는 것이 get, 이 get을 라우터, 이 작업을 라우팅!!!!
app.get('/login', function(req,res){
    res.send('Login please');
})



app.get('/dynamic', function(req,res){
 
    var lis = ''
    for(i=0; i<5; i++){
        lis = lis + '<li>coding</li>'
    }
    var date = new Date();
 
    var output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        Hello static!
        ${lis}
        ${date}
    </body>
    </html>`
    res.send(output)
})



app.listen(3000, function(){
    console.log('Connected 3000 port!')
});   // 앱에는 리슨이라는 매소드가 있는데 포트번호와 콜백함수를 지정해, 우리의 웹앱이 3000번 포트를 리스닝ㅎ ㅏ게 한다
      // 이 작업 이후 3000번 포트를 우리의 에플리케이션이 바라보게 함

      // 여기까지 하면 연결은 된거, 오류가 나긴 하지만 cannot GET/ 이거를 화면에 표현해줌

