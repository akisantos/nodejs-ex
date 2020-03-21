const express = require('express');

var app = express();

var http = require('http').createServer(app)
var io = require('socket.io')(http)


app.get('/',(req,res)=>{
  res.sendFile(__dirname +'/views/index.html')

})

// app.use(express.static(__dirname + '/views'));


io.on('connection',(socket)=>{

  socket.emit('HichatBox',{autoChat: 'Chào bạn mới vào phòng!'})
  console.log('guest has connected')


  // socket.on('connect',()=>{

  //   console.log('guest has connected')

  // })


  
  socket.on('disconnect',()=>{

    console.log('guest has disconnected')

  })


  socket.on('playerSync',(data)=>{
    var address = socket.handshake.address;
    console.log('Video syncing...', data.time, data.isPlaying);
    socket.broadcast.emit('playerSync', {time: data.time, isPlaying: data.isPlaying})

    // Thong bao
    socket.broadcast.emit('info',{autoChat: address + ' đã đồng bộ video đến giây ' + Math.round(data.time)})
    socket.emit('info',{autoChat: 'Bạn đã đồng bộ video đến giây ' + Math.round(data.time)})

  })


})

http.listen(8080,()=>{
  console.log('server opened')
})