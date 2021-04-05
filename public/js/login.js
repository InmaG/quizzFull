//Botón continuar y atrás   
const btnContinuar = document.getElementById("continueBtn");
const btnAtras = document.getElementById("backBtn");
const inputMail = document.getElementById("inputEmail")
const inputPass = document.getElementById("inputPass")
//cuando haces click en el botón continuar
btnContinuar.addEventListener("click", logInUser);

//Comprobar si los datos son correctos 


function logInUser(){
    // Petición desde front a back. Back nos devolverá una respuesta. 
    console.log("1", inputMail.value, inputPass.value);
    
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputMail.value,
            password: inputPass.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
        }
        else {
            alert(data.alert)
            window.location.href = "admin.html"
        }
    } )
   
    .catch(err => console.log("Algo va mal...", err))
};
