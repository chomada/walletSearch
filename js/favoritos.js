const miFav= new Red();
if(localStorage.proyectosFavoritos){
    miFav.favoritos=JSON.parse(localStorage.proyectosFavoritos);
    
}

const remover=(fav)=>{
    miFav.removerFavorito(fav)
}


function favoritos(){
    miFav.mostrarFavoritos()
   
  }
  
  //carga los favoritos apenas arranca la pagina
favoritos();
