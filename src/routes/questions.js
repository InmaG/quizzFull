const router = require ('express').Router();
const Question = require('../models/Questions');
// const { db } = require('../models/Questions/Users');
const md5 = require('md5');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const Questions = require('../models/Questions');
const secret=randomstring.generate(7);



//1. Ruta para obtener todas las preguntas /allquestions
router.get('/allquestions', async (req, res) => {

    try {
        const question = await Question.find()

        return res.status(200).json(question)

    } catch (error) {
        return res.status(404).json({"success": false,
        "mensaje": "No se han mostrado todas las preguntas"})
    }

})


//2. Ruta para obtener una pregunta /questions
router.get('/questions', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.findOne({_id})        
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(201).json({"success": true,
            "mensaje": "Se muesrta la pregunta"})
        }
    } catch (error) {
        return res.status(404).json({"success": false,
        "mensaje": "No se ha mostrado la pregunta"})
    }
})


//3. Ruta para crear una nueva pregunta /newquestions


router.post('/newQuestions', (req, res) => {
    const newQuestions = {
            title: req.body.title,
            correctAnswer: req.body.correctAnswer,
            answers: req.body. answers
            
    }
    try{
            Questions.create( newQuestions, (err, result) => {
                    console.log("2", err);
                    if(err) {
                            res.status(400).json({
                                    status: 400,
                                    ok: false,
                                    data: "Algo va mal, no se puede crear esa pregunta"
                            })
                    }else{
                            res.status(200).json({
                                    status:200,
                                    ok: true,
                                    data: "Pregunta guardada",
                                   
                            })
                    }
            })
    }catch{
            console.log("Error en la base de datos")
    }
})



// route.post('/newquestions', async (req, res) => {
//     console.log("1, a ver si entra");
    
//     try {
//         const { title } = req.body
//         const { correctAnswer } = req.body
//         const { answers } = req.body

//         const question = await Question.save({
//             title,
//             correctAnswer,
//             answers
//         });

//         return res.status(201).json(question)
//     } catch (error) {
//         return res.status(404).json({"success": false,
//         "mensaje": "No se ha podido crear la pregunta"})
//     }

   
// });


//4. Ruta para actualizar una nueva pergunta /updatequestion


// route.put('/editQuestion', (req, res) => {

//     const writeAnswers = {
//             pregunta: req.body.pregunta,
//             correctAnswer: req.body.correctAnswer,
//             respuesta: req.body.respuesta
            
//     }
//     console.log(writeAnswers)
//     try{
//             Quest.updateOne({_id: req.body._id}, writeAnswers, (err, result) => {
//                     if(err) {
//                             res.status(400).json({
//                                     status: 400,
//                                     ok: false,
//                                     data: "No se han encontrado preguntas para mostrar"
//                             })
//                     }else{
//                             res.status(200).json({
//                                     status:200,
//                                     ok: true,
//                                     data: "Pregunta guardada",
                                    

//                             })
//                     }
//             })
//     }catch{
//             console.log("Error en la base de datos")
//     }
// })
//4. Ruta para actualizar una nueva pergunta /updatequestion
router.put('/editQuestions', async (req, res) => {
    try {
        const _id = req.params.id 
        const { title, correctAnswer,answers } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.save({
                title,
                correctAnswer,
                answers
            })    
            return res.status(201).json({"success": true,
            "mensaje": "Se ha actualizado correctamente"})
        }else{
            question.title = title
            question.correctAnswer= correctAnswer
            question. answers =  answers
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(404).json({"success": false,
        "mensaje": "No se ha podido actualizar la pregunta"})
    }
    
})


//5. Ruta para eliminar una pregunta /deletequestion

// route.delete('/deletequestions/:id', async  (req, res) => {
//     try {
//         const _id = req.params.id 

//         const question = await Question.deleteOne({_id})

//         if(question.deletedCount === 0){
//             return res.status(404).json({"success": false,
//             "mensaje": "No se ha encontrado la pregunta"})
//         }else{
//             return res.status(201).json({"success": true,
//             "mensaje": "Se ha eliminado correctamente"})
//         }
//     } catch (error) {
//         return res.status(500).json({"error":error})
//     }

// })
//5. Ruta para eliminar una pregunta /deletequestion
router.delete('/deleteQuestions', (req, res) => {
    try{
            Questions.deleteOne({pregunta: req.body.pregunta}, (err, result) => {
                    if(err) {
                            res.status(400).json({
                                    status: 400,
                                    ok: false,
                                    data: "No se han encontrado preguntas para borrar"
                            })
                    }else{
                            res.status(200).json({
                                    status:200,
                                    ok: true,
                                    data: "Pregunta borrada con éxito",
                                
                            })
                    }
            })
    }catch{
            console.log("Error en la base de datos")
    }
})


//6. Ruta para hacer una prueba
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})
//7. leer las preguntas backend
router.get('/guestReadQuestions', (req, res) => {
       
    try{
            Questions.find({}, (err, result) => {
                    if(result == null){
                            res.status(400).json({
                                    status: 400,
                                    ok: false,
                                    data: "No se ha encontrado ninguna pregunta para mostrar en la base de datos"
                            })
                    }else{
                            res.status(200).json({
                                    status: 200,
                                    ok: true,
                                    results: result
                            })
                    }
            })
    }
    catch{
            console.log("Error en la base de datos")
    }
})

module.exports = router;