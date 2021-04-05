const express= require('express');
const mongoose = require('./src/config/db');

const listenPort = process.argv[2] || process.env.PORT || 4000;
const server = express();
const users = require('./src/routes/users');

const jwt = require('jsonwebtoken');
const keyJwt= {key:"JSONkey"};


// Aquí el middleware correspondiente para parsear el body de la request!

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", users);



  
    server.listen(listenPort,
      () => console.log(`Server started listening on ${listenPort}`)
    );
  