//이 파일의 역할은 웹 어플리케이션을 만들기 전에
//오리엔트 디비를 이용해서 데이터를, 오리엔트 js라는 도구를 이용해서 자바스크립트로 오리엔트디비의 데이터를 추가하는 등의 기본적인 작업들을 간단하게 해보고 프로젝트에 결합 해 보겠다.
//Configuring the Client
//서버 : 정보제공, 클라이언트 : 정보 요청
// 우리가 설치한 오리엔트디비는 서버임,
// 우리의 애플리케이션이 그 서버에 접속해서 정보를 요청하면 그 서버가 응답해주는 관계이기 때문에
// 우리의 nodejs 에플리케이션은 db에 대해서는 클라이언트, 브라우저에 대해선 서버!!!

//이 내용은 복사해옴

//이렇게 하면 오리엔트 db라는 함수가 실행되면서 이 객체가 전달이 되고,
// 내부적으로 호스트,포트,유저네임,패스워드가 실행이 되서 오리엔드DB가 서버라는 변수에 리턴해줌
// 접속을 끊을 때는 server.close()
var OrientDB = require("orientjs");

var server = OrientDB({
  host: "localhost", // 만약에 다른컴퓨터에 존재한다면 도메인을 넣어야겠지, 같은컴퓨터니까 로칼호스트
  port: 2424, // 기본적인 포트를 2424를 씀
  username: "root", // 유저네임 그대로
  password: "satul213"
});

//우리는 o2라는 데이터베이스를 쓸거야! 그러려면~~, o2라는 db 가져오기
//이거 클로우즈 해서 내가 못했다 지금까지 어휴 시간날렸네
var db = server.use("o2");
console.log("Using database : " + db.name);
//db.close();

//하나의 행(record)가져오기
//가져온 이후에 .then에 콜백함수가 호출됨, record에는 행의 정보가 담겨있음
db.record.get("#22:0").then(function(record) {
  // 한 행을 가져오겠다. 요 번호는 데이터베이스 참고하면 있음 rid!!! 자동으로 지정됨
  console.log("Loaded record : ", record);
});

//CRUD중 CREATE부터 해보자 by sql
//우선 첫재로 o2라는 클래스에 있는 모든행을 출력하는 명령을 먼저한번 해보겠습니다

var sql = "SELECT FROM topic";
db.query(sql).then(function(results) {
  console.log(results);
});

//우리가 특정한 행을 가져오고 싶다 예를들어 rid가 12:1인 애를 가져오고 싶다면
//WHERE조건이 있냐 없냐의 차이 앞에와
//WHERE가 없을 때는 db.query의 인자로 sql만 전달한 데에 비해
// WHERE절이 있을 때는 두번째 인자로 param이라는 객체를 줌
//그 객체 안에는 params라는 프로퍼티가 존재하고
// 그 프로퍼티 안에 rid라는 값으로 "#22:0"울 줌
// 객체이름은 param은 약속이 아니지만 그 안에 프로퍼티인 params는 약속이므로 꼭 지켜줘야함
var sql = "SELECT FROM topic WHERE @rid=:rid";
var param = {
  params: {
    rid: "#22:0"
  }
};
db.query(sql, param).then(function(results) {
  console.log(results);
});

//이번엔 추가
//추가된 결과가 results에 들어감!!
/*
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)"
var param = {
    params : {
        title : "Express",
        desc : "Express is framework for web"
    }
}
db.query(sql,param).then(function(results){
    console.log(results)
});
*/


//이번엔 업데이트, 추가된 데이터를 수정해볼거임
//여기서 results의 결과값으로 ['1']이 나옴, 몇개의 행이 수정되었나를 보여주나봄
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid"
db.query(sql,{params:{title:"EXpressJS",rid:"#21:1"}}).then(function(results){
    console.log(results)
})


//이번엔 DELETE
//얘도 결과값으로 위처럼 숫자 1이나옴, 삭제된 행의 숫자가 출력되나보다~
var sql = "DELETE FROM topic WHERE @rid=:rid"
db.query(sql,{params:{rid:"#21:1"}}).then(function(results){
    console.log(results)
})