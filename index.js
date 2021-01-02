let app=require('express')();

let http=require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
 
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect',()=>{

  console.log('disconnected');

  })
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});