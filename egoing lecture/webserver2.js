const http = require('http');   // http라는 모듈을 사용
 
const hostname = '127.0.0.1';
const port = 1338;
 


var server = http.createServer( function(request, response){
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end('Hello World2\n');

}  ); // 이거에 의해서 서버가 리턴됨, 서버라는 객체르 통해서 서버 조작, 안의 인자로는 사용자가 들어왔을 때 어떤 내용을 출력할 것인가??를 의미, 요청과 응답 2개의 인자
server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});                  // 서버 객체의 리슨이라는 매소르를 불러옴, 특정한 포트를 바라보게(리슨하게)
                     // 리슨은 오래걸려서 콜백이 필요함, 서버가 리스닝에 성공했을 때 console.log를 해주는것


