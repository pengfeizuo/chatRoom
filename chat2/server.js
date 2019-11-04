//聊天室2

var app = require('express')(); //引入express库
var http = require('http').Server(app); //将express注册到http中
var io = require('socket.io')(http);
var usocket = []; //全局变量
//当访问根目录时，返回Hello World
app.get('/', function(req, res){
//res.send('<h1>Hello world</h1>');
	res.sendFile(__dirname + '/room.html');
});
var name = ''
//new addition
io.on('connection', function(socket){
  console.log('a user connected');
   //监听join事件
  socket.on("join", function (name) {
  	console.log(name)
    usocket[name] = socket
    io.emit("join", name) //服务器通过广播将新用户发送给全体群聊成员
  })
  //new addition
  socket.on("message", function (msg) {
    io.emit("message",msg) //将新消息广播出去
  })
});

//启动监听，监听3000端口
http.listen(8081, function(){
  console.log('listening on *:8081');
});