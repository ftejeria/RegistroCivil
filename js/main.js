class Persona {
  constructor(nombre, apellido, edad, sexo) {
    this.nombre = nombre;
    this.edad = edad;
    this.apellido = apellido;
    this.sexo = sexo;
    this.dni = Math.floor(Math.random() * 100000);
  }
}
class RegistroCivil {
  //Inicializo el constructor con una lista vacia para ingresar personas
  constructor() {
    this.personas = [];
  }

  //Agrega personas al array
  addPersona(...personas) {
    this.personas.push(...personas);
  }

  //Agrega una persona al registro civil si los datos ingresados son validos
  ingresarPersonas(e) {
    e.preventDefault();
    const nombre = $("#input-nombre").val();
    const edad = $("#input-edad").val();
    const sexo = $("#select-sexo").val();
    const apellido = $("#input-apellido").val();

    if (!nombreValido(nombre)) {
      crearAlertaError(
        "Porfavor ingrese un nombre valido, mayor a tres caracteres y que solo tenga carateres"
      );
      return false;
    }
    if (!edadValida(edad)) {
      crearAlertaError(
        "Porfavor ingrese una edad valida, mayor a 0 caracteres y numerica"
      );
      return false;
    }
    if (!sexoValido(sexo)) {
      crearAlertaError(
        "Porfavor ingrese un sexo valido, Masculino, Femenino o Otro"
      );
      return false;
    }
    if (!nombreValido(apellido)) {
      crearAlertaError(
        "Porfavor ingrese un apellido valido, mayor a tres caracteres y que solo tenga carateres"
      );
      return false;
    }

    this.personas.push(new Persona(nombre, apellido, parseInt(edad), sexo));
    crearAlertaError(
      `Felicidades usted a registrado a la siguiente persona con exito:\n  Nombre: ${nombre}\n Apellido: ${apellido} \n  Edad: ${edad}\n  Sexo: ${sexo} `,
      true
    );
    $("#input-nombre").val("");
    $("#input-edad").val("");
    $("#select-sexo").val("Sexo");
    $("#input-apellido").val("");
  }
}

//Para el sistema un nombre es valido si no es un numero y si tiene mas de 3 caracteres y si no es nulo
function nombreValido(nombre) {
  return nombre !== null && nombre.length >= 3 && isNaN(parseInt(nombre));
}

//Para el sistema una edad es valida si es mayor que 0 y es un numero y si no es nulo
function edadValida(edad) {
  return edad !== null && edad > 0 && !isNaN(edad);
}

//Para el sistema un sexo es valida si es M o F o O
function sexoValido(sexo) {
  return sexo === "M" || sexo === "F" || sexo === "O";
}

//Ingresa las personas en una tabla
function mostrarPersonas(personas, mensajeAlerta) {
  if ($("#tbody-personas")) {
    $("#tbody-personas").remove();
  }

  const tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody-personas");
  personas.forEach((persona) => {
    let tr = document.createElement("tr");
    tr.setAttribute('id', persona.dni);

    let thDni = document.createElement("th");
    thDni.setAttribute("scope", "row");
    thDni.innerHTML = persona.dni;
    let tdNombre = document.createElement("td");
    tdNombre.innerHTML = persona.nombre;
    let tdApellido = document.createElement("td");
    tdApellido.innerHTML = persona.apellido;
    let tdEdad = document.createElement("td");
    tdEdad.innerHTML = persona.edad;
    let tdSexo = document.createElement("td");
    tdSexo.innerHTML = persona.sexo;
    let borrarButton = document.createElement("button");
    borrarButton.setAttribute("class", "btn btn-danger borrar-boton");
    borrarButton.setAttribute("id", persona.dni);
    borrarButton.setAttribute("onClick", `borrarPersona(this.id)`);
    borrarButton.setAttribute("data-bs-toggle", "modal");
    borrarButton.setAttribute("data-bs-target", "#exampleModal");

    borrarButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';

    tr.appendChild(thDni);
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEdad);
    tr.appendChild(tdSexo);
    tr.appendChild(borrarButton);
    tbody.appendChild(tr);
  });
  $("#tabla-personas").append(tbody);

  if ($("#total-de-personas")) {
    $("#total-de-personas").remove();
  }
  const totalPersonas = document.createElement("h6");
  totalPersonas.setAttribute("id", "total-de-personas");
  totalPersonas.innerText = `Total de personas: ${personas.length}`;
  $("#col-personas").append(totalPersonas);

  if (personas.length <= 0) {
    crearAlertaError(mensajeAlerta);
    return false;
  }
}

//Obtiene el mayor de edad de las personas
function obtenerMayor(personas) {
  const edades = personas.map((persona) => persona.edad);
  const personaMayor = personas.find(
    (persona) => persona.edad === Math.max.apply(Math, edades)
  );

  return JSON.stringify(personaMayor);
}

//Calculo el promedio de edades
function calcularPromedioEdades(personas) {
  let sumaDeEdades = 0;

  personas.forEach((persona) => {
    sumaDeEdades += persona.edad;
  });
  return personas.length > 0
    ? sumaDeEdades / personas.length
    : "No hay personas ingresadas en el Sistema";
}

// Genera una alerta de bootsrap con un mensaje de error
function crearAlertaError(mensaje, exito = false) {
  const alerta = $("#alertaError");

  if (exito) {
    alerta.attr("class", "alert alert-success alert-dismissible  show");
  } else {
    alerta.attr("class", "alert alert-danger alert-dismissible  show");
  }
  alerta.html(mensaje);
  alerta.fadeIn("slow");

  setTimeout(() => {
    alerta.fadeOut("slow");
  }, 4000);
}

//Una persona se considera mayor de edad si tiene 18 o mas
function calcularPersonasMayores(personas) {
  return personas.filter((persona) => persona.edad >= 18);
}
//Una persona se considera menor de edad si tiene 18 o menos
function calcularPersonasMenores(personas) {
  return personas.filter((persona) => persona.edad < 18);
}
//Filtra por sexo
function filtrarPorSexo(personas, sexo) {
  return personas.filter((persona) => persona.sexo === sexo);
}
//Ordena las personas de menor a mayor
function personasOrdenadasMenorAmayor(personas) {
  return personas.sort((a, b) => a.edad - b.edad);
}
//Ordena las personas de mayor a menor
function personasOrdenadasMayorAmenor(personas) {
  return personas.sort((a, b) => b.edad - a.edad);
}
//Ordena las personas por orden alfabetico
function ordenarPersonasAlfabetico(personas) {
  return personas.sort((a, b) => {
    return a.nombre > b.nombre ? 1 : -1;
  });
}

const registroCivil = new RegistroCivil();

$.getJSON("./data/personas.json", function (respuesta) {
  let personas = respuesta;
  personas.forEach((persona) =>
    registroCivil.addPersona(
      new Persona(persona.nombre, persona.apellido, persona.edad, persona.sexo)
    )
  );
  mostrarPersonas(registroCivil.personas)
});


//Obtenemos botones/form para setearles eventos
let formularioRegistro = document.getElementById("form-registrar-persona");
let botonMayores = document.getElementById("btn-metricas-mayores");
let botonMenores = document.getElementById("btn-metricas-menores");
let botonMayorAmenor = document.getElementById("btn-metricas-mayor-a-menor");
let botonMenorAmayor = document.getElementById("btn-metricas-menor-a-mayor");
let botonAlfabeticamente = document.getElementById(
  "btn-metricas-alfabeticamente"
);
let botonSexoM = document.getElementById("btn-metricas-sexo-m");
let botonSexoF = document.getElementById("btn-metricas-sexo-f");
let botonSexoO = document.getElementById("btn-metricas-sexo-o");
let eliminarModal = document.getElementById("eliminar-modal");
let filtro = document.getElementById("myFilter");
//Generamos los siguientes eventos a los botones/form
formularioRegistro.onsubmit = (e) => {
  registroCivil.ingresarPersonas(e);
  mostrarPersonas(registroCivil.personas);
};

botonMayores.onclick = () =>
  mostrarPersonas(
    calcularPersonasMayores(registroCivil.personas),
    "No hay personas mayores de edad"
  );
botonMenores.onclick = () =>
  mostrarPersonas(
    calcularPersonasMenores(registroCivil.personas),
    "No hay personas menores de edad"
  );
botonMenores.onclick = () =>
  mostrarPersonas(
    calcularPersonasMenores(registroCivil.personas),
    "No hay personas menores de edad"
  );
botonMayorAmenor.onclick = () =>
  mostrarPersonas(
    personasOrdenadasMayorAmenor(registroCivil.personas),
    "Porfavor ingrese personas al sistema"
  );
botonMenorAmayor.onclick = () =>
  mostrarPersonas(
    personasOrdenadasMenorAmayor(registroCivil.personas),
    "Porfavor ingrese personas al sistema"
  );

botonAlfabeticamente.onclick = () =>
  mostrarPersonas(
    ordenarPersonasAlfabetico(registroCivil.personas),
    "Porfavor ingrese personas al sistema"
  );

botonSexoM.onclick = () =>
  mostrarPersonas(
    filtrarPorSexo(registroCivil.personas, "M"),
    "Porfavor ingrese personas al sistema"
  );

botonSexoF.onclick = () =>
  mostrarPersonas(
    filtrarPorSexo(registroCivil.personas, "F"),
    "Porfavor ingrese personas al sistema"
  );

botonSexoO.onclick = () =>
  mostrarPersonas(
    filtrarPorSexo(registroCivil.personas, "O"),
    "Porfavor ingrese personas al sistema"
  );

filtro.onkeyup = () =>{

  registroCivil.personas.forEach((persona) =>{
    if(persona.dni.toString().indexOf(filtro.value)>-1){
      document.getElementById(persona.dni).style.display = ""
    }else{
      document.getElementById(persona.dni).style.display = "none"
    }
  })
}

//Borrar la persona del sistema en base a su dni si acepta el modal
function borrarPersona(dni, personas = registroCivil.personas) {
  
  personas.forEach((persona, index) => {
    if (persona.dni == parseInt(dni)) {
      var modalValue = document.getElementById("modal-value")
      modalValue.innerHTML = `Una vez borrada la persona tendras que volver a registrarla.¿Estas Seguro que quiere borrar a ${persona.nombre} con dni: ${persona.dni}?`;
    }
  });


  eliminarModal.onclick = () => {
    personas.forEach((persona, index) => {
      if (persona.dni == parseInt(dni)) {
        personas.splice(index, 1);
      }
    });

    mostrarPersonas(personas, "No hay personas en el sistema");
  };
}
