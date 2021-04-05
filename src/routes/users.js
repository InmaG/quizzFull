const router = require('express').Router();
const { create, validate, db } = require('../models/Users');
const { db } = require('./Questions/Users');
const user =require('../models/Users');
const md5 = require('md5');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const secret=randomstring.generate(7);

function validateEmailPass(email,password){
    let patternEmail =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let patternPass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; 
    console.log(patternEmail.test(email))
    
    console.log(patternPass.test(password))
    return patternEmail.test(email)&&patternPass.test(password)
    
}
// router.post('/login', (req, res)=>{
//     console.log('POST' ,'/login');
//     console.log(req.body);
//     const USER = {
//             user: req.body.email,
//             password: req.body.password
//     }
//     try {
//     if(validateEmailPass(req.body.email, req.body.password)){
           
//             User.findOne(USER, (err, result)=>{   // Nos busca el campo { email } y se introducen los cambios como un objeto {token, private: secret}
                    
//                             if (result == null) {
//                                     res.status(400).json({
//                                             status:400,
//                                             data: "Su email o contraseña no coinciden con el de nuestra base de datos",
//                                             ok: false
//                                     })
//                             }
//                             else {
//                                     res.status(200).json({
//                                             status:200,
//                                             data: result,
//                                             alert: "Login correctly",
//                                             ok: true,
//                                             url: "admin.html"
//                                     })
//                             }
//     })

//     }else{
//             res.status(500).json({
//                     alert: "No has introducido una contraseña o un email válido, vuelve a intentarlo",
//                     status: 500,
//                     ok: false,
//                     url: "login.html"
//             })
//     }
// }catch {
//             console.log("Error con la base de datos");
//     }

// })



router.post('/login', (req, res)=>{
    const USER = {
            user : req.body.email,
            password: req.body.password
    }
    try {
            User.findOne(USER, (err, result)=>{   // Nos busca el campo { email } y se introducen los cambios como un objeto {token, private: secret}
           console.log(result)
            if (result == null) {
                    res.status(400).json({
                            status:400,
                            data: "No match",
                            ok: false
                    })
            }
            else {
                    res.status(200).json({
                            status:200,
                            data: result,
                            alert: "Login correctly",
                            ok: true
                    })
            }
    })
}
catch {
    console.log("Error con la base de datos");
}
})

router.post('/registro', (req, res)=>{
console.log(req.body)
if(validateEmailPass(req.body.email,req.body.password)){
    user.find({email:req.body.email}, (err, data)=>{
        if(err) {
            throw err
        }else if(data.length === 0){
    
           const hashPassword= md5(req.body.password) 
            user.create({
                email: req.body.email,
                password: hashPassword
                // token: "",
                // private:""
               
            })
            res.status(200).json({"success": true,
                      "mensaje": "Usuario creado con éxito"})
        } else {
            res.status(404).json({"success": false,
            "mensaje": "El email ya está en uso"})
        }
    });

}else{
    res.send("Introduce un mail y contraseña correcta")
}
//validar que el usuario y la constraseña sean validos por regex 

});

/*router.post('/login', (req, res)=>{
const {email} = req.body;
const password = md5(req.body.password);
let token = jwt.sign({email, password}, secret, {expiresIn: 60*60});
//aqui tenemos datos 
//comprobar los dos datos email y password con la base de datos
user.updateOne({email},{token, private:secret} ,(err, result)=>{
    console.log(result);
    if(result.nModified===1){
        res.status(200).json(
            {
                'success': true, 
                'message': 'Bienvenido a la página',
                 token
            }  
       
      
            );
//si no existe mensaje, redireccionamos a un nuevo registro
    } else{
        console.log('Objeto vacío');
        res.redirect('/registro');
        }
    })
});*/
//cerrar la sesión y borrar el token de la base de datos. Tenenemos que buscar en front tiene un token(en este caso se enviará también
//por headers key "autentication(copiado y pegado a mano") Hacer un split para separar.
router.post('/logout', (req, res)=>{
    let tokenRaw = req.headers.authorization.split(":");
        console.log(tokenRaw)

        let tokenSearch= jwt.decode(tokenRaw[1])
        console.log(tokenSearch);

        user.find({email:tokenSearch.email}, (err, result)=>{
            console.log("2", result)
        try{
            let verify = jwt.verify(tokenRaw[1], result[0].private)
        console.log(result[0].private)
        console.log("ver", verify)
        if(verify){
            user.updateOne({email:verify.email}, {token:"",private:""}, (err, result)=>{
                res.redirect(200, '/login'); 
            });
        }
         }catch(err){
            res.status(401).json({
                data: "La sensión ha caducado",
                status:false,
            })
            console.log(err);
         }
          
        
})
});

router.get('/private',(req, res)=>{
    let tokenRaw = req.headers.authorization.split(":");
        console.log(tokenRaw)

        let tokenSearch= jwt.decode(tokenRaw[1])
        console.log(tokenSearch);
        user.find({email:tokenSearch.email}, (err, result)=>{
            console.log("2", result)
        try{
            let verify = jwt.verify(tokenRaw[1], result[0].private)
        console.log(result[0].private)
        console.log("ver", verify)
        if(verify){
            
                res.send("Bienvenido a tu zona de confort"); 
            
        }
         }catch(err){
            res.send(200, '/login');
            
            console.log(err);
         }
          
        
});

});

//Hacer login
// route.post('/login', (req, res)=>{
//     const USER = {
//             user : req.body.email,
//             password: req.body.password
//     }
//     try {
//             user.findOne(USER, (err, result)=>{   // Nos busca el campo { email } y se introducen los cambios como un objeto {token, private: secret}
//             if (result == null) {
//                     res.status(400).json({
//                             status:400,
//                             data: "No match",
//                             ok: false
//                     })
//             }
//             else {
//                     res.status(200).json({
//                             status:200,
//                             data: result,
//                             alert: "Login correctly",
//                             ok: true
//                     })
//             }
//     })
// }
// catch {
//     console.log("Error con la base de datos");
// }
// })

module.exports = router;


// let result = jwt.verify(token, privateKey);
// console.log(result);

//Consultar si exite mail(busco con find lo que me llegue por el campo mail)
//Si existe enviar mensaje de error que ya existe
//Si no insertar en la base de datos y enviar mensaje de exito




// server.get('/user/read', (req, res) => {
//     try {
//         let tokenArr = req.headers.authorization.split(" ");
//         let decode = jwt.decode(tokenArr[1]);
//         if (decode.user){
//             MongoClient.connect(URL, (err, db)=> {
//                 try {
//                     db.db("users")
//                         .collection("Users")
//                         .findOne({user: decode.user}, (err, result) => {
//                             try {
//                                 let verify = jwt.verify(tokenArr[1], result.secret)
//                                 if (verify) {
//                                     res.send(result)
//                                     db.close();
//                                 }
//                             }
//                             catch {
//                                 res.status(401).json({
//                                     data: "Algo va mal... La sesión ha caducado",
//                                     ok: false,
//                                 })
//                                 console.log(err);
//                             }
//                         })
//                 }
//                 catch {
//                     console.log(err);
//                     res.send("Something working wrong with database")
//                 }
//             })
//         }
//     } catch {
//         res.status(401).json({
//             data: "EL token no es valido",
//             ok: false,
//         })
//     }
// })