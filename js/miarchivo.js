const miRed= new Red();


//cargo el local storage
if(localStorage.proyectosFavoritos){
    miRed.favoritos=JSON.parse(localStorage.proyectosFavoritos);
    
}
//si ya habia usado el dark mode lo cargo para no tener q tocarlo cada vez que uso la app 
if(localStorage.darkMode){
    miRed.miDark=JSON.parse(localStorage.darkMode);
    
}
if(localStorage.walletGuardada){
    
    $('#inputWallet').val(JSON.parse(localStorage.walletGuardada))
}
miRed.cargarModo()

//la idea de la pagina es ingresar tu direccion de wallet y seleccionar la red en la que operas, y que te muestre el saldo que te queda en la red,etc.
//luego tambien nos dira los mejores proyectos de la red que elegimos



//consulta el saldo

const consultarSaldo = ()=>{
   
    const valor= document.getElementById('inputWallet').value;

    if(!miRed.miRed){
        $("#verSaldo").html(`<h3 class="alert alert-danger">Debes seleccionar una red primero</h3> `)
        $("#verSaldo").fadeIn("fast", function(){
          $("#verSaldo").delay(4000).fadeOut("slow")
        });

      }
      else {
        miRed.consultarSaldo(valor);
    
    }

    


}

//agrego boton para buscar wallet y ver el saldo
$('#boton-buscar').on('click',function(){
    consultarSaldo();

});

//carga la red dependiendo de cual elejimos
 const cambiarRed =(red)=>{
    $("#titulo").hide();
    $("#mejoresProyectos").hide()
   
    if(red=='Binance'){
        $("#verConsejo").hide();
        $('#inputWallet').val('0x6a967a86436ff75bfd943b1c546b6c26582de9a8')
   
        miRed.cargarProyectos('Binance')
        
        document.getElementById('titulo').innerHTML='Estas en la Red de BSC';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en BNB?';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba</h6>`);
        $("#verConsejo").fadeIn("slow");
        
        
    }else if(red=='Polygon'){
        $("#verConsejo").hide();
        $('#inputWallet').val('0xee68e4c594b96efc19a9d7d2a33901651ce967a2')
        miRed.cargarProyectos('Polygon')
        
        document.getElementById('titulo').innerHTML='Estas en la Red de Polygon';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en MATIC?';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba</h6>`);
        $("#verConsejo").fadeIn("slow");
    }
    else if(red=='Ethereum'){
        $("#verConsejo").hide();
        $('#inputWallet').val('0x9562a71660d31728f904e6790465b2613fd1e579')
        miRed.cargarProyectos('Ethereum')
       
        document.getElementById('titulo').innerHTML='Estas en la Red de Ethereum';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en ETH';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba</h6>`);
        $("#verConsejo").fadeIn("slow");
    }else if(red=='Rootstock'){
        
        miRed.cargarProyectos('Rootstock')
       
        document.getElementById('titulo').innerHTML='Estas en la Red de RSK';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en rBTC';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba</h6>`);
        $("#verConsejo").fadeIn("slow");
    }

    $("#verSaldo").fadeOut('fast');
    $("#verPrecio").fadeOut('fast');
    
    $("#mejoresProyectos").fadeIn("slow")
    $("#titulo").fadeIn("slow");
 
}



const agregar =(fav)=>{

    miRed.agregarFavoritos(fav)
}





// const cambiarRed =(red)=>{
//     $("#titulo").hide();
//     $("#mejoresProyectos").hide()
   
//     if(red=='Binance'){
//         $("#verConsejo").hide();
//         miRed.cargarProyectos(proyectosBNB)
//         miRed.cargarRed(binance)
//         document.getElementById('titulo').innerHTML='Estas en la Red de BSC';
//         document.getElementById('address').innerHTML='Cuanto Gas te queda en BNB?';
//         $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba 0x6a967a86436ff75bfd943b1c546b6c26582de9a8</h6>`);
//         $("#verConsejo").fadeIn("slow");
        
//     }else if(red=='Polygon'){
//         $("#verConsejo").hide();
//         miRed.cargarProyectos(proyectosMATIC)
//         miRed.cargarRed(polygon)
//         document.getElementById('titulo').innerHTML='Estas en la Red de Polygon';
//         document.getElementById('address').innerHTML='Cuanto Gas te queda en MATIC?';
//         $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba 0xee68e4c594b96efc19a9d7d2a33901651ce967a2</h6>`);
//         $("#verConsejo").fadeIn("slow");
//     }
//     else if(red=='Ethereum'){
//         $("#verConsejo").hide();
//         miRed.cargarProyectos(proyectosETH)
//         miRed.cargarRed(ethereum);
//         document.getElementById('titulo').innerHTML='Estas en la Red de Ethereum';
//         document.getElementById('address').innerHTML='Cuanto Gas te queda en ETH';
//         $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba 0x9562a71660d31728f904e6790465b2613fd1e579</h6>`);
//         $("#verConsejo").fadeIn("slow");
//     }else if(red=='Rootstock'){
        
//         miRed.cargarProyectos(proyectosRBTC)
//         miRed.cargarRed(rootstock);
//         document.getElementById('titulo').innerHTML='Estas en la Red de RSK';
//         document.getElementById('address').innerHTML='Cuanto Gas te queda en rBTC';
//     }

//     $("#verSaldo").html('');
//     miRed.mostrarProyectos();
//     $("#mejoresProyectos").fadeIn("slow")
//     $("#titulo").fadeIn("slow");
    
    
    
// }
