const miRed= new Red();


//cargo el local storage
if(localStorage.proyectosFavoritos){
    miRed.favoritos=JSON.parse(localStorage.proyectosFavoritos);
    
}
//si ya habia usado el dark mode lo cargo para no tener q tocarlo cada vez que uso la app 
if(localStorage.darkMode){
    miRed.miDark=JSON.parse(localStorage.darkMode);
    
}
miRed.cargarModo()

//la idea de la pagina es ingresar tu direccion de wallet y seleccionar la red en la que operas, y que te muestre el saldo que te queda en la red,etc.
//luego tambien nos dira los mejores proyectos de la red que elegimos

//en este ejemplo al no estar configuradas las APIs ni toda la funcionalidad podes ingresar cualquier wallet y hacer como que la busca realmente...


//estos proyectos van a ser traidos mediante APIs
const proyectosBNB=[{name:'PancakeSwap',token:'CAKE',red:'Binance Smart Chain',image: "https://assets.coingecko.com/coins/images/12632/large/pancakeswap-cake-logo_%281%29.png?1629359065"},{name:'Binance USD',token:'BUSD',red:'Binance Smart Chain',image: "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766"}];
const proyectosETH=[{name:'Maker',token:'MKR',red:'Ethereum',image: "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1585191826"},{name:'The Graph',token:'GRT',red:'Ethereum',image: "https://assets.coingecko.com/coins/images/13397/large/Graph_Token.png?1608145566"}];
const proyectosRBTC=[{name:'RSK Infrastructure Framework',token:'RIF',red:'Rootstock',image: "https://assets.coingecko.com/coins/images/7460/large/RIF.png?1558011767"},{name:'Bitcoin',token:'BTC',red:'Rootstock',image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"}];
const proyectosMATIC=[{name:'Polycat Finance',token:'FISH',red:'Polygon',image: "https://assets.coingecko.com/coins/images/15226/large/smallLogo.png?1620269393"},{name:'Harvest Finance',token:'FARM',red:'Polygon',image: "https://assets.coingecko.com/coins/images/12304/large/Harvest.png?1613016180"}];


//estos valores van a ser traidos median APIs
const binance = { coin: 'BNB', precio: 500, name: "Binance Smart Chain" };
const ethereum = { coin: 'ETH', precio: 3000, name: "Ethereum" };
const polygon = { coin: 'MATIC', precio: 1.2, name: "Polygon" };
const rootstock = { coin: 'RBTC', precio: 42000, name: "Rootstock"};
    


//consulta el saldo

const consultarSaldo = ()=>{
   
    const valor= document.getElementById('inputSaldo').value;

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
        miRed.cargarProyectos(proyectosBNB)
        miRed.cargarRed(binance)
        document.getElementById('titulo').innerHTML='Estas en la Red de BSC';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en BNB?';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba 0x6a967a86436ff75bfd943b1c546b6c26582de9a8</h6>`);
        $("#verConsejo").fadeIn("slow");
        
    }else if(red=='Polygon'){
        $("#verConsejo").hide();
        miRed.cargarProyectos(proyectosMATIC)
        miRed.cargarRed(polygon)
        document.getElementById('titulo').innerHTML='Estas en la Red de Polygon';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en MATIC?';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba 0xee68e4c594b96efc19a9d7d2a33901651ce967a2</h6>`);
        $("#verConsejo").fadeIn("slow");
    }
    else if(red=='Ethereum'){
        $("#verConsejo").hide();
        miRed.cargarProyectos(proyectosETH)
        miRed.cargarRed(ethereum);
        document.getElementById('titulo').innerHTML='Estas en la Red de Ethereum';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en ETH';
        $("#verConsejo").html(`<h6 class="alert alert-secondary">Si no tenes una wallet podes buscar esta de prueba 0x9562a71660d31728f904e6790465b2613fd1e579</h6>`);
        $("#verConsejo").fadeIn("slow");
    }else if(red=='Rootstock'){
        
        miRed.cargarProyectos(proyectosRBTC)
        miRed.cargarRed(rootstock);
        document.getElementById('titulo').innerHTML='Estas en la Red de RSK';
        document.getElementById('address').innerHTML='Cuanto Gas te queda en rBTC';
    }

    $("#verSaldo").html('');
    miRed.mostrarProyectos();
    $("#mejoresProyectos").fadeIn("slow")
    $("#titulo").fadeIn("slow");
    
    
    
}



const agregar =(fav)=>{

    miRed.agregarFavoritos(fav)
}
