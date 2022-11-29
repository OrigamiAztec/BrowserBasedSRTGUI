// all javascript packages I have to import 

  //used for making an application that can be accessed from localhost
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
  //used for sending data from this javascript file to "animationResponse.js"
const { Server } = require("socket.io");
const io = new Server(server);
  //used for formatting file path from own laptop
const path = require('path');
  //use for reading data from serialport for arduino such as "COM7".
const { SerialPort } = require('serialport')
  //just re-import specific package from SerialPort for parsing strings.
const { ReadlineParser } = require('@serialport/parser-readline')
  //data being checked from serialport, path 'COM7', baudrate 9600, then other inputs that I have no idea what they do but it's worked no problem.
const padWeightSerialport = new SerialPort({ path: 'COM7', baudRate: 9600, dataBits: 8, parity: 'none', stopBits: 1, flowControl: false })
  // used for packages to read data over ethernet
const Net = require('net');


//setting express application to use 'public' files for localhost location
app.use(express.static(path.join(__dirname, 'public')));


// The port number and hostname of the server.
const port = 23;
const launchBoxHostIP = '192.168.137.93';

//const padWeightHostIP = '192.168.137.91';

// Create a new TCP client.
const client = new Net.Socket();
// Connect to TCP client with given port number and log connection.
client.connect({ port: port, host: launchBoxHostIP }, function() {console.log('TCP connection established with the LB.');});

//look for .index
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

client.on('data', function(chunk) {
  console.log(`LB: ${chunk.toString()}.`)
  io.emit('data2', chunk.toString());
})

padWeightSerialport.on("open", () => {
  console.log('serial port open');
});

const padWeightParser = padWeightSerialport.pipe(new ReadlineParser({ delimiter: '\n' }))

padWeightParser.on('data', (data) => {
    console.log('PW:' +  data);
    io.emit('padWeightSerialData', data);
});


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