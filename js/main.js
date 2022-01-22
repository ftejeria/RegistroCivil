

class Persona {
  constructor(nombre,apellido, edad, sexo) {
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
    const nombre = document.getElementById("input-nombre").value;
    const edad = document.getElementById("input-edad").value;
    const sexo = document.getElementById("select-sexo").value;
    const apellido = document.getElementById("input-apellido").value;

    if (!nombreValido(nombre)) {
      crearAlerta(
        "Porfavor ingrese un nombre valido, mayor a tres caracteres y que solo tenga carateres"
      );
      return false;
    }
    if (!edadValida(edad)) {
      crearAlerta(
        "Porfavor ingrese una edad valida, mayor a 0 caracteres y numerica"
      );
      return false;
    }
    if (!sexoValido(sexo)) {
      crearAlerta("Porfavor ingrese un sexo valido, Masculino, Femenino o Otro");
      return false;
    }
    if (!nombreValido(apellido)) {
      crearAlerta(
        "Porfavor ingrese un apellido valido, mayor a tres caracteres y que solo tenga carateres"
      );
      return false;
    }

    this.personas.push(new Persona(nombre, apellido,parseInt(edad), sexo));
    crearAlerta(
      `Felicidades usted a registrado a la siguiente persona con exito:\n  Nombre: ${nombre}\n Apellido: ${apellido} \n  Edad: ${edad}\n  Sexo: ${sexo} `,true
    );
    document.getElementById("input-nombre").value = "";
    document.getElementById("input-edad").value = "";
    document.getElementById("select-sexo").value = "Sexo";
    document.getElementById("input-apellido").value = "";
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
  if (document.getElementById("tbody-personas")) {
    document.getElementById("tbody-personas").remove();
  }

  if (personas.length <= 0) {
    crearAlerta(mensajeAlerta);
    return false;
  }

  const tbody = document.createElement("tbody");
  tbody.setAttribute("id", "tbody-personas");
  personas.forEach((persona) => {
    let tr = document.createElement("tr");
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

    tr.appendChild(thDni);
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEdad);
    tr.appendChild(tdSexo);
    tbody.appendChild(tr);
  });
  document.getElementById("tabla-personas").appendChild(tbody);

  
  if (document.getElementById("total-de-personas")) {
    document.getElementById("total-de-personas").remove();
  }
  const totalPersonas = document.createElement('h6');
  totalPersonas.setAttribute('id','total-de-personas')
  totalPersonas.innerText = `Total de personas: ${personas.length}`
  document.getElementById('col-personas').appendChild(totalPersonas);

  
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
function crearAlerta(mensaje,exito=false){

  const alerta = document.getElementById('alertaError');

  if(exito){
    alerta.setAttribute('class','alert alert-success alert-dismissible  show')
  }else{
    alerta.setAttribute('class','alert alert-danger alert-dismissible  show')
  }
  alerta.innerHTML = mensaje;
  alerta.style.display='block';

  setTimeout(()=>{alerta.style.display='none'},4000);


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


//Cargar datos dummy
localStorage.setItem('PersonaDummy1', JSON.stringify(new Persona("Sebastian","Ramirez",23,"M")));
localStorage.setItem('PersonaDummy2', JSON.stringify(new Persona("Juana","Perez",43,"F")));
localStorage.setItem('PersonaDummy3', JSON.stringify(new Persona("Enrique","Ramirez",12,"O")));
const registroCivil = new RegistroCivil();
registroCivil.addPersona(JSON.parse(localStorage.getItem('PersonaDummy1')),JSON.parse(localStorage.getItem('PersonaDummy2')),JSON.parse(localStorage.getItem('PersonaDummy3')))
mostrarPersonas(registroCivil.personas)


//Obtenemos botones/form para setearles eventos
let botonMostrarResultado = document.getElementById("btn-mostrar-resultado");
let formularioRegistro = document.getElementById("form-registrar-persona");
let botonMayores = document.getElementById("btn-metricas-mayores");
let botonMenores = document.getElementById("btn-metricas-menores");
let botonMayorAmenor = document.getElementById("btn-metricas-mayor-a-menor");
let botonMenorAmayor = document.getElementById("btn-metricas-menor-a-mayor");
let botonAlfabeticamente = document.getElementById("btn-metricas-alfabeticamente");
let botonSexoM = document.getElementById("btn-metricas-sexo-m");
let botonSexoF = document.getElementById("btn-metricas-sexo-f");
let botonSexoO = document.getElementById("btn-metricas-sexo-o");

//Generamos los siguientes eventos a los botones/form
formularioRegistro.onsubmit = (e) => registroCivil.ingresarPersonas(e);
botonMostrarResultado.onclick = () =>
  mostrarPersonas(
    registroCivil.personas,
    "Porfavor ingrese personas al sistema"
  );
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
    filtrarPorSexo(registroCivil.personas,"M"),
    "Porfavor ingrese personas al sistema"
  );

  botonSexoF.onclick = () =>
  mostrarPersonas(
    filtrarPorSexo(registroCivil.personas,"F"),
    "Porfavor ingrese personas al sistema"
  );

  botonSexoO.onclick = () =>
  mostrarPersonas(
    filtrarPorSexo(registroCivil.personas,"O"),
    "Porfavor ingrese personas al sistema"
  );


// crearElemento(`Total de personas ${personas.length}`, "span", "div-metricas");
// crearElemento(
//   `Mayor de todos ${obtenerMayor(personas)} `,
//   "span",
//   "div-metricas"
// );
