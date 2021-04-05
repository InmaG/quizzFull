const mongoose = require('../config/db.js');
// const mongoose = require('mongoose')

//1. creo el esquema del modelo.
const questionsSchema= new mongoose.Schema({

    title:{
        type: String,
    },
    correctAnswer:{
        type: Number,
    },
    answers:[{
        label: String,
            id: String,
            name: String,
            value: String,
         }],
})
//2. creo el modelo y lo exporto

const Questions = mongoose.model('Questions', questionsSchema);
module.exports = Questions;

