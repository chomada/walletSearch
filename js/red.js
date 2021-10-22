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
    //con esto puedo cambiar el dark mode y guardarlo en el local storage
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
    // cargo el modo oscuro si es el que fue usado sino lo dejo como esta
    cargarModo(){
      
      let btnSwitch = document.querySelector('#switch');

      if (this.miDark=='oscuro'){
        document.body.classList.add('dark');
        btnSwitch.classList.add('suichardi');
        }
    }

    //la idea seria que al ingresar la wallet una API nos devuelva el saldo real
    //luego hago la conversion para ver saldo en dolares y en la moneda de la red
    async consultarSaldo(wallet){
      $("#verSaldo").hide();
      $("#verConsejo").hide();
      $("#verPrecio").hide();
      localStorage.walletGuardada=JSON.stringify(wallet);
      
    
         if (this.miRed.binancecoin){
          
   
            const response = await fetch(`https://api.bscscan.com/api?module=account&action=balance&address=${wallet}&apikey=DSPFR6EEJR17HVJPPCBPCB4NKSA5N4UNI5`)
            const datos = await response.json();
            const valor = await(datos.result)/1000000000000000000;
            this.miSaldo= await Number(valor.toFixed(6));
              
            if(datos.result==0){
              $("#verSaldo").html(`<h3 class="alert alert-danger">Usted no tiene saldo o no existe esa direccion</h3> `)
              $("#verSaldo").fadeIn("fast", function(){
                $("#verSaldo").delay(4000).fadeOut("slow")
              });

            }else if(datos.status==0){
              $("#verSaldo").html(`<h3 class="alert alert-danger">El formato de la direccion es inválido para la red seleccionada</h3>`);
              $("#verSaldo").fadeIn("fast", function(){
                $("#verSaldo").delay(4000).fadeOut("slow")
              });

              
            }
            else {
              let balance= this.miSaldo*this.miRed.binancecoin.usd
              $("#verSaldo").html(`<h3 class="alert alert-warning">Actualmente te quedan ${this.miSaldo} BNB</h3><h3 class="alert alert-warning">Equivalente a $${Number(balance.toFixed(2))} USD</h3>`);
              $("#verPrecio").html(`<h6 class="alert alert-warning"><strong>El precio de BNB es de $${this.miRed.binancecoin.usd}</strong></h6>`);
              $("#verSaldo").fadeIn("slow");
              $("#verPrecio").fadeIn("slow");
            }
          

          // this.miSaldo=200;
          // let total= this.miSaldo/parseFloat(this.miRed.precio);
        
          // let verSaldo =document.getElementById("verSaldo");
          // $("#verSaldo").html(`<h3 class="alert alert-warning">Actualmente te queda ${Number(total.toFixed(8))} ${this.miRed.coin}</h3>`);
          // $("#verSaldo").fadeIn("slow");
        
      }
      
        
      else if (this.miRed.ethereum){
        
       
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=EBRZ3ZB43TAG7RSJGB5NTNVGFVG8REAU1F`)
        const datos = await response.json();
        const valor = await(datos.result)/1000000000000000000;
        this.miSaldo= await Number(valor.toFixed(6));
  
       if(datos.result==0){
        $("#verSaldo").html(`<h3 class="alert alert-danger">Usted no tiene saldo o no existe esa direccion</h3> `)
        $("#verSaldo").fadeIn("fast", function(){
          $("#verSaldo").delay(4000).fadeOut("slow")
        });

      }else if(datos.status==0){
        $("#verSaldo").html(`<h3 class="alert alert-danger">El formato de la direccion es inválido para la red seleccionada</h3>`);
        $("#verSaldo").fadeIn("fast", function(){
          $("#verSaldo").delay(4000).fadeOut("slow")
        });

        
      }
      else {
        let balance= this.miSaldo*this.miRed.ethereum.usd
        $("#verSaldo").html(`<h3 class="alert alert-warning">Actualmente te quedan ${this.miSaldo} ETH</h3><h3 class="alert alert-warning">Equivalente a $${Number(balance.toFixed(2))} USD</h3>`);
        $("#verPrecio").html(`<h6 class="alert alert-warning"><strong>El precio de ETH es de $${this.miRed.ethereum.usd}</strong></h6>`);
        
        $("#verSaldo").fadeIn("slow");
        $("#verPrecio").fadeIn("slow");
        
      }
    
      }  
      else{
        
       
        const response = await fetch(`https://api.polygonscan.com/api?module=account&action=balance&address=${wallet}&apikey=WGGDVWCGEMCFFSZNJYVU1CN5NVFZYU723C`)
        const datos = await response.json();
        const valor = await(datos.result)/1000000000000000000;
        this.miSaldo= await Number(valor.toFixed(6));
  
       if(datos.result==0){
        $("#verSaldo").html(`<h3 class="alert alert-danger">Usted no tiene saldo o no existe esa direccion</h3> `)
        $("#verSaldo").fadeIn("fast", function(){
          $("#verSaldo").delay(4000).fadeOut("slow")
        });

      }else if(datos.status==0){
        $("#verSaldo").html(`<h3 class="alert alert-danger">El formato de la direccion es inválido para la red seleccionada</h3>`);
        $("#verSaldo").fadeIn("fast", function(){
          $("#verSaldo").delay(4000).fadeOut("slow")
        });

        
      }
      else {
        //let balance= this.miSaldo*this.miRed.matic-network.usd
        console.log(this.miRed)
        $("#verSaldo").html(`<h3 class="alert alert-warning">Actualmente te quedan ${this.miSaldo} MATIC</h3><h3 class="alert alert-warning">Equivalente a $$ USD</h3>`);
        $("#verPrecio").html(`<h6 class="alert alert-warning"><strong>El precio de MATIC es de $$</strong></h6>`); //this.miRed.matic-network.usd
        $("#verSaldo").fadeIn("slow");
        $("#verPrecio").fadeIn("slow");
      }
    
      }     
    }

    //carga los proyectos segun la red elegida
    async cargarProyectos(nombreRed){


      
      if (nombreRed=='Binance'){
        const binance = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`);
        const datosRed= await binance.json();
        
        this.miRed=datosRed;
        

        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=binance-smart-chain&order=market_cap_desc&per_page=1&page=1&sparkline=false`)
        const datos = await response.json();
               this.proyectos=datos;
        
        await this.mostrarProyectos();
        
      }else if (nombreRed=='Polygon'){
        const polygon = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`);
        const datosRed= await polygon.json();
       
        this.miRed=datosRed;
        

        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=polygon-ecosystem&order=market_cap_desc&per_page=1&page=1&sparkline=false`)
        const datos = await response.json();
               this.proyectos=datos;
        
        await this.mostrarProyectos();
        
      }
      else if (nombreRed=='Ethereum'){
        const ethereum = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
        const datosRed= await ethereum.json();
        
        this.miRed=datosRed;
        

        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=1&page=1&sparkline=false`)
        const datos = await response.json();
               this.proyectos=datos;
        
        await this.mostrarProyectos();
        
      }
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
         

          let proyectosTotal="";
          if (this.favoritos.length==0){
             proyectosTotal=` <div class="alerta-fav "><h3 class="alert alert-danger">No tienes favoritos todavia</h3></div>`
           }else{
             
            for (const proyect of this.favoritos){
              
              proyectosTotal=proyectosTotal+`<div class="proyecto-chico proyecto-favorito" style="width: 18rem;">
                 <img src="${proyect.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${proyect.name}</h5>
                   <p class="card-text">${proyect.symbol.toUpperCase()}</p>
                   <button onclick="remover('${proyect.name}')" class="btn btn-danger">Borrar</button>
                 </div>
               </div>`;
              
  
            }
           }
           $("#proyectos-favoritos").html(proyectosTotal);
          

    }



    //muestra los proyectos de la red elegida
     mostrarProyectos(){

         
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
                       <h6>Simbolo: ${proyect.symbol.toUpperCase()}</h6>
                       <h6>Market Cap: $${proyect.market_cap}</h6>
                       <h6>Total Supply: $${proyect.total_supply}</h6>
                       <h6>ATH: $${proyect.ath}</h6>
                       <h6>Precio actual: $${proyect.current_price}</h6>
                       <h6><em>${proyect.last_updated}</em></h6>

                       
                       </div>
                       
                       <div class="modal-footer">
                         <button type="button" class="btn btn-light btn-outline-dark" data-bs-dismiss="modal">cerrar</button>
                         <button type="button" class="btn btn-light btn-outline-danger"onclick="agregar('${proyect.name}')" data-bs-dismiss="modal">Agregar Favoritos</button>
                       </div>
                     </div>
                   </div>
                 </div></div>`;
                
             }
             $("#mejoresProyectos").html(proyectosTotal)
             
             
           
            

    }
}