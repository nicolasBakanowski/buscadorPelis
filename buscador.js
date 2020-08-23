const APY_KEY = '3876c60d'
let URL = 'http://www.omdbapi.com/?apikey=3876c60d';

let nombrePelicula = document.getElementById('nombrePelicula');
let buscar = document.getElementById('btnbuscar');
let resultado =document.getElementById('resultado');
let btn_next = document.getElementById("btn_next");
let btn_prev = document.getElementById("btn_prev");
let current_page = 1;


function prevPage(current_page)
{
    if (current_page > 1) {
        current_page--;
        return current_page;
    }
}

function nextPage(current_page)
{
        current_page++;
        return current_page;
}


buscar.addEventListener("click",function(){
    buscarPeli(current_page);
})

btn_next.addEventListener('click',function(){
    current_page = nextPage(current_page)
    buscarPeli(current_page);
})
btn_prev.addEventListener('click',function(){
    current_page = prevPage();
    buscarPeli(current_page);
})



function procesarResultado(dato){
    let temporal = ''
    let listing_table = document.getElementById("listingTable");
    listing_table.innerHTML = "";
    console.log(dato.totalResults);
    console.log(dato);
    temporal +='<b>'+ dato.totalResults+"</b>" + 'resultados encontrads'
    dato.Search.map(function(peli){ 
    listing_table.innerHTML +=`<div class="col-lg-3 col-md-6 col-sm-12 margen"> <h3 class="text-center"> ${peli.Title} </h3> <img class = "ajusteimg mx-auto d-block" src=${peli.Poster}></div>`
    });

    
}

function buscarPeli(current_page){
    let search = URL+'&s='+encodeURIComponent(nombrePelicula.value)+'&page='+current_page;
    let response={};
    let xreq =new XMLHttpRequest();
    xreq.open('GET',search);
    xreq.timeout= 15000;
    xreq.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xreq.send();
    xreq.onload = function(){
       console.log(xreq.responseText);
       response=JSON.parse(xreq.responseText);
       procesarResultado(response);
       
   }
   
};