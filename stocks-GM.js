let myinputEl = document.getElementById('input-el')
let ulEl = document.getElementById('ul-el')
let AddBtn = document.getElementById('add-btn')
let Listitem = document.getElementById('listitem')
let RenderWatchlist = document.getElementById("render-watchlist")
let listboxEl = document.getElementById("listbox")
let sname
let usStocks 

fetch("us-data.json")
.then(response => {
   return response.json();
})
.then(data => {console.log(data)
usStocks = data
});

function GetPriceData(){
    fetch(`https://finnhub.io/api/v1/quote?symbol=${sname}&token=cdmujmiad3i9q6h6852gcdmujmiad3i9q6h68530`).then(response=>response.json()).then(data=>console.log(data))
}
function UpdateWatchlist(str){
    RenderWatchlist.innerHTML += `<div class="item-watchlist">
    <p>${str}</p>
    <div class="btns">
        <button>B</button>
        <button>S</button>
        <button >C</button>
    </div>
   </div>`
}
function filterfunction(){
    let filter = myinputEl.value.toUpperCase();
    let ul = ulEl
    let li = ul.getElementsByTagName("li")
    for(let i=0; i<800; i++){
        let a = ulEl.getElementsByTagName('li')[i]
        if(a){
            let txtvalue = a.textContent || a.innerHTML
           if(txtvalue.indexOf(filter) > -1){
            li[i].style.display = "";
           }else{
            li[i].style.display = "none";
           }
        }
    }
}
function Renderlist(){
    let optnames
    for(let i=0; i<usStocks.length; i++){
    optnames += `<li  id="listitem">${usStocks[i].Symbol}</li>`;
}
ulEl.innerHTML = optnames
}
myinputEl.addEventListener("click",Renderlist)

ulEl.addEventListener('click',(e)=>{
    console.log(e.path[0].innerHTML);
    sname = e.path[0].innerHTML
    GetPriceData();
    UpdateWatchlist(sname)
    
})
listboxEl.addEventListener("mouseleave",()=>{
    ulEl.innerHTML = ''
})






