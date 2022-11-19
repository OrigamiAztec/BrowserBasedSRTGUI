const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


const Net = require('net');
// The port number and hostname of the server.
const port = 23;
const launchBoxHostIP = '192.168.137.93';

const padWeightHostIP = '192.168.137.91';

// Create a new TCP client.
const client = new Net.Socket();

client.connect({ port: port, host: launchBoxHostIP }, function() {console.log('TCP connection established with the LB.');});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

client.on('data', function(chunk) {
  console.log(`LB: ${chunk.toString()}.`)
  io.emit('data2', chunk.toString());
})

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });

  socket.on('inputString', function(data){
    client.write(data);
  })

});

/*
const client2 = new Net.Socket();

client2.connect({ port: port, host: padWeightHostIP }, function() {console.log('TCP connection established with the PW.');});

client2.on('data', function(chunk) {
  console.log(`PW: ${chunk.toString()}.`)
  io.emit('padWeightdata', chunk.toString());
})
*/

server.listen(3000, () => {
  console.log('listening on *:3000');
});