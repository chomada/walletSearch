// hice una clase donde veo...
// el saldo 
// la red ingresada
// los proyectos de la red ingresada
// los proyectos favoritos que voy seleccionando

class Red {

    constructor() {
        this.miSaldo=0;
        this.miRed='';
        this.proyectos=[];
        this.favoritos=[];
        this.miDark='';
        
    }
    //con esto puedo cambiar el dark modo y guardarlo en el local storage
    cambiarModo(){
      let btnSwitch = document.querySelector('#switch');

      if(this.miDark=='oscuro'){
        document.body.classList.remove('dark');
        btnSwitch.classList.remove('suichardi');
        localStorage.darkMode=JSON.stringify('claro');
        this.miDark='claro';

      }else{
        document.body.classList.add('dark');
        btnSwitch.classList.add('suichardi');
        localStorage.darkMode=JSON.stringify('oscuro');
        this.miDark='oscuro';
      }

    }
    // cargo el modo oscuto o claro que haya quedado
    cargarModo(){
      
      let btnSwitch = document.querySelector('#switch');

      if (this.miDark=='oscuro'){
        document.body.classList.add('dark');
        btnSwitch.classList.add('suichardi');
        }
    }
    //la idea seria que al ingresar la wallet una API nos devuelva el saldo real
    //luego hago la conversion para ver saldo en dolares y en la moneda de la red
    consultarSaldo(wallet){
        if(this.miRed==''){
          verSaldo.innerHTML=`<h3 class="alert alert-danger">Debes serleccionar una red primero</h3> `;

        }else{
          if (wallet){
            this.miSaldo=200;
            let total= this.miSaldo/parseFloat(this.miRed.precio);
          
            let verSaldo =document.getElementById("verSaldo");
            
            
            
            verSaldo.innerHTML=`<h3 class="alert alert-warning">Actualmente te queda ${Number(total.toFixed(8))} ${this.miRed.coin}</h3>`;
        }

        }
    }

    //carga los proyectos segun la red elegida
    cargarProyectos(proyectosParaCargar){


        this.proyectos=proyectosParaCargar;
        

    }
    //carga la red elegida 
    cargarRed(nombreRed){
        
        this.miRed=nombreRed;
        
        
    }

    //agrega a favoritos el proyecto elegido, hice un if para que solo se pueda agregar una vez el mismo proyecto  y no se repita
    agregarFavoritos(favorito){
      
      let fav = this.proyectos.find(proyect=>proyect.name ===favorito)
      let filtrar = this.favoritos.filter(element=>element.name===favorito)
     
     if (filtrar[0]){
       // si ya esta en favoritos no hace nada
     }else{
       // si no esta lo agrego
       this.favoritos.push(fav);

     }

      localStorage.proyectosFavoritos=JSON.stringify(this.favoritos);

    }


    //remueve favorito elegido
    removerFavorito(favorito){
      const indice =this.favoritos.findIndex(proyect=>proyect.name===favorito);
      this.favoritos.splice(indice,1)
      localStorage.proyectosFavoritos=JSON.stringify(this.favoritos);
      this.mostrarFavoritos();

    }


    //muestra los proyectos favoritos 
    mostrarFavoritos(){
          let proyectosFavoritos =document.getElementById("proyectos-favoritos")

          let proyectosTotal="";
          if (this.favoritos.length==0){
             proyectosTotal=` <div class="alerta-fav "><h3 class="alert alert-danger">No tienes favoritos todavia</h3></div>`
           }else{
            for (const proyect of this.favoritos){
              proyectosTotal=proyectosTotal+`<div class="proyecto-chico proyecto-favorito" style="width: 18rem;">
                 <img src="${proyect.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${proyect.name}</h5>
                   <p class="card-text">${proyect.token}</p>
                   <button onclick="remover('${proyect.name}')" class="btn btn-danger">Borrar</button>
                 </div>
               </div>`;
  
            }
           }
           proyectosFavoritos.innerHTML=proyectosTotal;
    }



    //muestra los proyectos de la red elegida
    mostrarProyectos(){

            let mejoresProyectos =document.getElementById("mejoresProyectos")
            let proyectosTotal="";
            let suma=0
             for (const proyect of this.proyectos){
                 suma=suma+1

                 proyectosTotal=proyectosTotal+`<div class="proyecto-chico"<!-- Button trigger modal -->
                 <img id="imagenProyecto"src="${proyect.image}"type="button"  data-bs-toggle="modal" data-bs-target="#modal${suma}">
               
                 
                 
                 <!-- Modal -->
                 <div class="modal fade" id="modal${suma}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div class="modal-dialog">
                     <div class="modal-content">
                       <div class="modal-header">
                         <h3 class="modal-title" id="exampleModalLabel">${proyect.name}</h3>
                         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                       </div>
                       <div class="modal-body">
                       ${proyect.token} - ${proyect.red}
                       </div>
                       <div class="modal-footer">
                         <button type="button" class="btn btn-light btn-outline-dark" data-bs-dismiss="modal">cerrar</button>
                         <button type="button" class="btn btn-light btn-outline-danger"onclick="agregar('${proyect.name}')">Agregar Favoritos</button>
                       </div>
                     </div>
                   </div>
                 </div></div>`
                
             }
             mejoresProyectos.innerHTML= proyectosTotal;

    }
}