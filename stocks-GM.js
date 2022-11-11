let myinputEl = document.getElementById('input-el')
let ulEl = document.getElementById('ul-el')
let AddBtn = document.getElementById('add-btn')
let Listitem = document.getElementById('listitem')
let RenderWatchlist = document.getElementById("render-watchlist")
let listboxEl = document.getElementById("listbox")
let NSEbtn = document.getElementById("nse-btn")
let NSDQbtn = document.getElementById("nsdq-btn")
let BNBSbtn = document.getElementById("bnbs-btn")
let exchange = 0
let usStocks 
let nsestocks
let Cryptonames

// import data for nsdaq
fetch("us-data.json").then(response =>response.json())
.then(data => {console.log(data)
    usStocks = data
});


//fetch data for NSE
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3da147d207msh81549da6e4e8910p10a44ajsn1bcc5dcf03bb',
		'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
	}
}
fetch('https://latest-stock-price.p.rapidapi.com/any', options)
.then(response =>response.json())
.then(data => {console.log(data); nsestocks = data.map(data=>data.symbol)})

//fetch data for crypto coins
fetch('https://api.coincap.io/v2/assets')
.then(response =>response.json()).then(content => {console.log(content.data)
    Cryptonames =  content.data.map(content => content.name)
console.log(Cryptonames);})


NSEbtn.addEventListener("click",()=>{exchange = 1})
NSDQbtn.addEventListener("click",()=>{exchange = 2})
BNBSbtn.addEventListener("click",()=>{exchange = 3})
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
    
    let li = ulEl.getElementsByTagName("li")
    for(let i=0; i<900; i++){
        let a = li[i]
        if(a){
            let txtvalue = a.textContent.toUpperCase() || a.innerHTML.toUpperCase()
           if(txtvalue.indexOf(filter) > -1){
            li[i].style.display = "";
           }else{
            li[i].style.display = "none";
           }
        }
    }
}
function Renderlist(){
    //US STOCKS
    if(exchange===2){
    let UsStocknames
    for(let i=0; i<usStocks.length; i++){
        UsStocknames += `<li  id="listitem">${usStocks[i].Name}</li>`;
}
ulEl.innerHTML = UsStocknames
    }
    //nse stocks
    if(exchange ===1){
        let insertNseStockNames
        for(let i=0; i<nsestocks.length; i++){
            insertNseStockNames += `<li id="listitem">${nsestocks[i]}</li>`;
        }
        ulEl.innerHTML = insertNseStockNames
    }
    if(exchange ===3){
        let insertCryptoNames
        for(let i=0; i<Cryptonames.length; i++){
            insertCryptoNames += `<li id="listitem">${Cryptonames[i]}</li>`;
        }
        ulEl.innerHTML = insertCryptoNames
    }
    else{
        return false;
    }
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








