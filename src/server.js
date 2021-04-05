const express= require('express');
// const mongoose = require('./src/config/db');
const dotenv = require('dotenv').config();
// const routeMiddleware = require('./routes');
// const { db } = require('./Questions/Users');
const cors = require('cors')


const listenPort = process.argv[2] || process.env.PORT || 4000;
const server = express();
const questions = require('./routes/questions');
const users = require('./models/Users');
const question = require('./models/Questions');

const jwt = require('jsonwebtoken');
const keyJwt= {key:"JSONkey"};


// Apuntar al front (tiene que ir siempre)
const staticFilesPath = express.static(__dirname + '/public');
server.use(staticFilesPath);

// Aquí el middleware correspondiente para parsear el body de la request!
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// server.use(routeMiddleware);
server.use("/", questions);

// // Middleware para parsear el body de la respuesta
// server.use(express.json());
// server.use(express.urlencoded({extended: false}));


  
    server.listen(listenPort,
      () => console.log(`Server started listening on ${listenPort}`)
    );
  