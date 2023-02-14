/* var awsIot = require('aws-iot-device-sdk');
const WebSocket = require('ws');
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')



app.use(cors())
const ws = new WebSocket.Server({ port: 3001 });

ws.on('connection', (ws) => {
  console.log('Client connected');
  res.send(ws)
});


var device = awsIot.device({
  keyPath: "C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/8a31adfb91f7629f41845c7bf94c366d9ad926f37ae50df7acb65cacdba794a5-private.pem.key",
 certPath: "C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/8a31adfb91f7629f41845c7bf94c366d9ad926f37ae50df7acb65cacdba794a5-certificate.pem.crt",
   caPath: "C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/AmazonRootCA1.pem",
 clientId: "hazal_javascript",
     host: "a1lhxt6uhfa5o7-ats.iot.eu-central-1.amazonaws.com"
});

device.on('connect', function() {
   console.log('connect');
   device.subscribe('Publish_Test');
   device.publish('Test', JSON.stringify({ test_data: 1}));
 });

let x = {
  "gyro" : {
    "x" : 255,
    "y" : 255,
    "z" : 255
  }
};

device.on('message', function(topic, payload) {
   console.log('message', topic, payload.toString());
   x = payload.toString();
   io.send('message', (x));
 });


app.get('/sensors', (req, res) => {
  res.send(x)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 */














const express = require("express");
var cors = require('cors');
const app = express();
const http = require("http").createServer(app);
const port = 3000;

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var device = require("aws-iot-device-sdk").device({
keyPath:
"C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/8a31adfb91f7629f41845c7bf94c366d9ad926f37ae50df7acb65cacdba794a5-private.pem.key",
certPath:
"C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/8a31adfb91f7629f41845c7bf94c366d9ad926f37ae50df7acb65cacdba794a5-certificate.pem.crt",
caPath:
"C:/Users/hazal/OneDrive/Masaüstü/Software/aws/aws-iot/aws-certificates/AmazonRootCA1.pem",
clientId: "hazal_javascript",
host: "a1lhxt6uhfa5o7-ats.iot.eu-central-1.amazonaws.com"
});

device.on("connect", function () {
  console.log("connect");
  device.subscribe("Publish_Test");
  device.publish("Test", JSON.stringify({ test_data: 1 }));
});

let x = {
  gyro: {
    x: 255,
    y: 255,
    z: 255,
  },
};

device.on("message", function (topic, payload) {
  console.log("message", topic, payload.toString());
  x = JSON.parse(payload.toString());
  io.emit("message", x);
});

app.get("/", (req, res) => {
  res.send(x);
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


