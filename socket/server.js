// const net = require( 'net' );
// const port = 8000;
// const hostname = '127.0.0.1';

// // 定义两个变量， 一个用来计数，一个用来保存客户端
// let clients = {};
// let clientName = 0;

// // 创建服务器
// const server = new net.createServer();

// server.on('connection', (client) => {
//   client.name = ++clientName; // 给每一个client起个名
//   clients[client.name] = client; // 将client保存在clients

//   client.on('data', function (msg) { //接收client发来的信息
//     console.log(`客户端${client.name}发来一个信息：${msg}`);
    
//   });
//   client.write('hello 大家好~~');
//   client.on('error', function (e) { //监听客户端异常
//     console.log('client error' + e);
//     client.end();
//   });

//   client.on( 'close', function () {
//     delete clients[client.name];
//     console.log(`客户端${ client.name }下线了`);
//   });

// });

// server.listen( port,hostname,function () {
//   console.log(`服务器运行在：http://${hostname}:${port}`);
// });
const katex = require('katex');
var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
var net = require('net');
//模块引入
var listenPort = 8085;//监听端口
var server = net.createServer(function(socket){
  // 创建socket服务端
  console.log('connect: ' +
    socket.remoteAddress + ':' + socket.remotePort);
  socket.setEncoding('binary');
  //接收到数据
  socket.on('data',function(data){
    console.log('client send:' + data);
    socket.write(katex.renderToString(data));
    console.log(katex.renderToString(data))
    // socket.write("##");  
    socket.destroy();
  });

 // socket.pipe(socket);
  //数据错误事件
  socket.on('error',function(exception){
    console.log('socket error:' + exception);
    socket.end();
  });
  //客户端关闭事件
  socket.on('close',function(data){
    console.log('client closed!');
     // socket.remoteAddress + ' ' + socket.remotePort);
  });
}).listen(listenPort);
//服务器监听事件
server.on('listening',function(){
  console.log("server listening:" + server.address().port);
});
//服务器错误事件
server.on("error",function(exception){
  console.log("server error:" + exception);
});