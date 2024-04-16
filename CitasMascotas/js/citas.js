//LO primero es crear los selectores de los input, utilizando los id

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const contenedorCitas = document.querySelector('#citas');
const formulario = document.querySelector('#nueva-cita');
let editar;

// podemos crear nuevos tipos de datos con las clases
// se definen al inicio despues de los selectores

class citas{
    //sintaxis
    // this: es un apuntador
   constructor(){
    this.citas = []
   } 
   agregarCita(cita){
    this.citas = [...this.citas,cita]
    console.log(this.citas);//para chequear las citas
   }
    
   eliminarCitas(id){
    this.citas = this.citas.filter(citas=>citas.id  !==id);
   }

   editarCitas(citaAct){
    this.citas = this.citas.map(citas=>citas.id === citaAct.id ? citaAct : citas);
   }
  /* sintaxis 
  condicion ? true : false
  */
}


class ui{
   imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        // mostrar el mensaje de error en la interfaz e
        divMensaje.textContent = mensaje;
        // agregar mensaje
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'))
        
        setTimeout(()=>{
            divMensaje.remove();
        },3000);
   }

   imprimirCitas({citas}){
    //console.log("si entra")
    this.limpiarHTML();
    citas.forEach(citas=> {
        const {mascota, propietario, telefono, fecha, hora, sintomas, id} = citas;
        const divCita = document.createElement('div');
        divCita.classList.add('cita','p-3');
        // estoy creando un atributo personalizado
        divCita.dataset.id = id;
        // Generar los textos
        const mascotaParrafo = document.createElement('h2');
        mascotaParrafo.classList.add('card-title', 'font-weight-bolder')
        mascotaParrafo.textContent = mascota;

        const propietarioParrafo = document.createElement('p')
        propietarioParrafo.innerHTML= ` 
        <span class = "font-weight-bolder">propietario:${propietario}</span>
       
        `

        const telefonoParrafo = document.createElement('p')
        telefonoParrafo.innerHTML= ` 
        <span class = "font-weight-bolder">Telefono:${telefono}</span>
       
        `    
        
        const fechaParrafo = document.createElement('p')
        fechaParrafo.innerHTML= ` 
        <span class = "font-weight-bolder">Fecha:${fecha}</span>
       
        `
        const horaParrafo = document.createElement('p')
        horaParrafo.innerHTML= ` 
        <span class = "font-weight-bolder">Hora:${hora}</span>
       
        `

        const sintomasParrafo = document.createElement('p')
        sintomasParrafo.innerHTML= ` 
        <span class = "font-weight-bolder">Sintomas:${sintomas}</span>
       
        `

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnEliminar.onclick = ()=> eliminarCita(id);

        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn','btn-info');
        btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
        btnEditar.onclick = ()=> cargarEdicion(citas);
         

        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        contenedorCitas.appendChild(divCita);

      

    })
   }

   limpiarHTML(){
    while(contenedorCitas.firstChild){
        contenedorCitas.removeChild(contenedorCitas.firstChild);
    }


}
}

// instancia de las clases para acceder a sus metodos

const administrarCitas = new citas();
const useri = new ui();

// eventos

eventos();

function eventos(){

    mascotaInput.addEventListener('input',datosCita)
    propietarioInput.addEventListener('input',datosCita)
    telefonoInput.addEventListener('input',datosCita)
    fechaInput.addEventListener('input',datosCita)
    horaInput.addEventListener('input',datosCita)
    sintomasInput.addEventListener('input',datosCita)
    formulario.addEventListener('submit',nuevaCita)
    

}

// crear la estructura para guardar datos

const citasObj ={
    mascota:'',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas:''
}

function datosCita(e){
  // guardar valores dentro del objeto
  //console.log(e.target.value)
  // funcion general
  citasObj[e.target.name] = e.target.value;
  //console.log(citasObj);
}

function nuevaCita(e){
    //validar y agregar una nueva cita
    e.preventDefault();

  //  console.log(citasObj)

  //Extraer la informacion del objeto
  
  const{mascota, propietario, telefono, fecha, hora, sintomas} = citasObj;

  //validacion, que todos los campos deverian ser obligatorios

   if(mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas==='' ){
   console.log('todos los campos son obligatorios');
   useri.imprimirAlerta('todos los campos son obligatorios', 'error');
   return;
   }

   // datos completos para crear la nueva cita

   if(editar){
   // console.log("estoy editando")
   formulario.querySelector('button[type=submit]').textContent = 'crear cita';
   editar = true;

   administrarCitas.editarCitas({...citasObj});
   
   // mensaje de datos corretos
   useri.imprimirAlerta('Se ha modificado la cita correctamente')

  }else{
    console.log("creando nueva cita")
    citasObj.id = Date.now();
    administrarCitas.agregarCita({...citasObj});
    useri.imprimirAlerta('Se ha agregado su cita satisfactoriamente')
    // console.log(citasObj);
   }
  
  //reset al formulario  
    formulario.reset();
    reiniciarObjeto();
    useri.imprimirCitas(administrarCitas)
    console.log(citasObj);

}

function reiniciarObjeto(){
citasObj.mascota = '',
citasObj.propietario = '',
citasObj.telefono = '',
citasObj.fecha = '',
citasObj.hora = '',
citasObj.sintomas = '',
citasObj.id = ''
}


function eliminarCita(id){
    //console.log('hola')
    administrarCitas.eliminarCitas(id);
    // mostrar un mensaje de aprovacion
    useri.imprimirAlerta('La cita se ha eliminado corretamente');

    // actualizar

    useri.imprimirCitas(administrarCitas);

}

function cargarEdicion(cita){
 // console.log('editar')
 const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

 //llenar los input

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value =hora;
  sintomasInput.value = sintomas;

    // vamos a llenar el objeto
    

    citasObj.mascota = mascota;
    citasObj.propietario = propietario;
    citasObj.telefono = telefono;
    citasObj.fecha = fecha;
    citasObj.hora = hora;
    citasObj.sintomas = sintomas;
    citasObj.id = id;



    // cambira el texto del boton

    formulario.querySelector('button[type=submit]').textContent = 'Guardar';
    editar = true;


   
}