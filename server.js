'use strict'
const http = require('http')
const path = require('path')
const express = require('express')
var bodyParser = require('body-parser');
const socketIo = require('socket.io')
const cors=require('cors');

const api=require('./routes/api.js');
const mysql=require('./mysql/mysql.js');
const sqlOps=require('./sqlOps/sqlOps.js');

const port=3000;
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use('/',api);
// app.use(express.bodyParser());

// app.use(bodyParser.json());



server.listen(port, err => {
  if (err) {
    throw err
  }

  console.log('server started on port 3000')
});
