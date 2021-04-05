const mongoose = require('mongoose');


//1. creo las dependencias

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        unique:true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
      // private: {
      //   type: String,
      // },
      // token:{
      //     type: String,
      // }

   });

// 2. Creo el modelo y lo exporto
const User = mongoose.model('User', userSchema);
module.exports = User;