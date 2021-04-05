const main = document.querySelector("main");
const btnCreate= document.getElementById("btnCreate");


// 1. Fech para leer las preguntas.

function readQuestions() {
    fetch('/allquestions')
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        data.data.map(elem => printQuestions(elem))
    })
    .catch(err => console.log(err))
}


//2. DOM para pintar preguntas, más botón de update y delete

function printQuestions(elem){

    let questTitle = document.createElement("h2");
    questTitle.textContent = elem.pregunta;
    questTitle.setAttribute("id", "questTitle");
    questTitle.setAttribute("class", "questTitle");
    main.appendChild(questTitle);

    let questDelete = document.createElement("button");
    questDelete.textContent = "Eliminar";
    questDelete.setAttribute("type", "button");
    questDelete.setAttribute("class", "btnDom");
    main.appendChild(questDelete)

        questDelete.addEventListener("click", () => {
            deleteAnswer(elem.pregunta)
        })
    
    let questUpdate = document.createElement("button");
    questUpdate.textContent = "Actualizar";
    questUpdate.setAttribute("type", "button");
    questUpdate.setAttribute("class", "btnDom");
    main.appendChild(questUpdate)
   
        questUpdate.addEventListener("click", () => {
            editAnswer(elem) 
    //----> sustituir placeholder por value.preguntas / value.respuestas
    
    })
}

readQuestions() // Invocamos a la función allQuestions, directamente al abrir el documento.

//3. Función que borra el DOM
function removeBody(){
    document.querySelector("wrapper").querySelectorAll("*").forEach(elem => elem.remove())
}

//4. Crear las preguntas en Front.
btnCreate.addEventListener("click", createAnswer)

function createAnswer(){

    removeBody()

    // Título
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("placeholder", "Inserta aquí un título");
    inputTitle.setAttribute("class", "inputTitle");
    main.appendChild(inputTitle);

    // Respuestas
    let inputAns1 = document.createElement("input");
    inputAns1.setAttribute("placeholder", "Inserta aquí tu primera respuesta");
    inputAns1.setAttribute("class", "inputAns");
    main.appendChild(inputAns1);

    let inputAns2 = document.createElement("input");
    inputAns2.setAttribute("placeholder", "Inserta aquí tu segunda respuesta");
    inputAns2.setAttribute("class", "inputAns");
    main.appendChild(inputAns2);

    let inputAns3 = document.createElement("input");
    inputAns3.setAttribute("placeholder", "Inserta aquí tu tercera respuesta");
    inputAns3.setAttribute("class", "inputAns");
    main.appendChild(inputAns3);

    let inputAns4 = document.createElement("input");
    inputAns4.setAttribute("placeholder", "Inserta aquí tu cuarta respuesta");
    inputAns4.setAttribute("class", "inputAns");
    main.appendChild(inputAns4);

    // Selector
    let selectorAns = document.createElement("select");
    selectorAns.setAttribute("id", "select");
    wrapper.appendChild(selectorAns);

                // Las opciones del selectorAns anterior, preñadas en el propio selector y con valores y texto como yo elija.
                let opt1 = document.createElement("option");
                opt1.textContent = "1";
                opt1.setAttribute("value", 0);
                opt1.setAttribute("id", "opt1");
                selectorAns.appendChild(opt1);

                let opt2 = document.createElement("option");
                opt2.textContent = "2";
                opt2.setAttribute("value", 1);
                opt2.setAttribute("id", "opt2");
                selectorAns.appendChild(opt2);

                let opt3 = document.createElement("option");
                opt3.textContent = "3";
                opt3.setAttribute("value", 2);
                opt3.setAttribute("id", "opt3");
                selectorAns.appendChild(opt3);

                let opt4 = document.createElement("option");
                opt4.textContent = "4";
                opt4.setAttribute("value", 3);
                opt4.setAttribute("id", "opt4");
                selectorAns.appendChild(opt4);

    // Boton de enviar pregunta + 4 respuestas + valor correcto
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Enviar pregunta";
    submitBtn.setAttribute("id", "submitBtn");
    main.appendChild(submitBtn);

    submitBtn.addEventListener("click", () => {
        submitNewAnswer(inputTitle.value, inputAns1.value, inputAns2.value, inputAns3.value, inputAns4.value, Number(selectorAns.value))
        
    })
    
    
}

//5. Crear nuevas respuestas en front
function submitNewAnswer(elemTitle, elemAns1, elemAns2, elemAns3, elemAns4, elemSelect){

    fetch('/newQuestions', {
        method: 'POST',
        body: JSON.stringify({
            pregunta: elemTitle,
            respuesta: [elemAns1, elemAns2, elemAns3, elemAns4],
            correcta: elemSelect,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })    
    .then(response => response.json())
    .then(data => {
        console.log("1", data)
        if(data.status == 400){
            alert(data.data)
        }
        else {
            alert(data.data)
            window.location.href = data.url
            console.log(data.url)
        }
    } )
   
    .catch(err => console.log("No se puede crear pregunta", err)) 
}

//6. Borrar preguntas

function deleteAnswer(pregunta) {
    fetch('/deleteQuestions', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pregunta: pregunta})
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
            console.log("1", data)
        }
        else {
            alert(data.data)
            console.log("2", data)
            window.location.href = data.url      
        }
    } )
   
    .catch(err => console.log("No se puede borrar pregunta", err)) 
}




//7. Editar las respuestas

function editAnswer(elem){

    removeBody()

    // Título
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("value", elem.pregunta);
    inputTitle.setAttribute("class", "inputTitle");
    wrapper.appendChild(inputTitle);

    // Respuestas
    let inputAns1 = document.createElement("input");
    inputAns1.setAttribute("value", elem.respuesta[0]);
    inputAns1.setAttribute("class", "inputAns");
    wrapper.appendChild(inputAns1);

    let inputAns2 = document.createElement("input");
    inputAns2.setAttribute("value", elem.respuesta[1]);
    inputAns2.setAttribute("class", "inputAns");
    wrapper.appendChild(inputAns2);

    let inputAns3 = document.createElement("input");
    inputAns3.setAttribute("value", elem.respuesta[2]);
    inputAns3.setAttribute("class", "inputAns");
    wrapper.appendChild(inputAns3);

    let inputAns4 = document.createElement("input");
    inputAns4.setAttribute("value", elem.respuesta[3]);
    inputAns4.setAttribute("class", "inputAns");
    wrapper.appendChild(inputAns4);

    // Selector
    let selectorAns = document.createElement("select");
    selectorAns.setAttribute("id", "select");
    wrapper.appendChild(selectorAns);

                // Las opciones del selectorAns anterior, preñadas en el propio selector y con valores y texto como yo elija.
                let opt1 = document.createElement("option");
                opt1.textContent = "1";
                opt1.setAttribute("value", 0);
                opt1.setAttribute("id", "opt1");
                selectorAns.appendChild(opt1);

                let opt2 = document.createElement("option");
                opt2.textContent = "2";
                opt2.setAttribute("value", 1);
                opt2.setAttribute("id", "opt2");
                selectorAns.appendChild(opt2);

                let opt3 = document.createElement("option");
                opt3.textContent = "3";
                opt3.setAttribute("value", 2);
                opt3.setAttribute("id", "opt3");
                selectorAns.appendChild(opt3);

                let opt4 = document.createElement("option");
                opt4.textContent = "4";
                opt4.setAttribute("value", 3);
                opt4.setAttribute("id", "opt4");
                selectorAns.appendChild(opt4);

    // Boton de enviar pregunta + 4 respuestas + valor correcto
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Enviar pregunta";
    submitBtn.setAttribute("id", "submitBtn");
    wrapper.appendChild(submitBtn);

    submitBtn.addEventListener("click", () => {
        editDBAnswer(inputTitle.value, inputAns1.value, inputAns2.value, inputAns3.value, inputAns4.value, Number(selectorAns.value), elem._id)
        
    let backBtn;
    })   
}

function editDBAnswer(elemTitle, elemAns1, elemAns2, elemAns3, elemAns4, elemSelect, id){

    fetch('/editQuestion', {
        method: 'PUT',
        body: JSON.stringify({
            pregunta: elemTitle,
            respuesta: [elemAns1, elemAns2, elemAns3, elemAns4],
            correcta: elemSelect,
            _id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })    
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
            console.log(data)
        }
        else {
            alert(data.data)
            window.location.href = "admin.html"
        }
    } )
    .catch(err => console.log("Algo está yendo mal...", err)) 
}




