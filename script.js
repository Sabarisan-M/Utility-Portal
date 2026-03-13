/* CLOCKS */

function updateTime(){

document.getElementById("ist").innerText =
new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"})

document.getElementById("uk").innerText =
new Date().toLocaleString("en-US",{timeZone:"Europe/London"})

document.getElementById("cet").innerText =
new Date().toLocaleString("en-US",{timeZone:"Europe/Berlin"})

}

setInterval(updateTime,1000)


/* DROPDOWN */

function toggleMenu(id){

let menus=document.querySelectorAll(".submenu")

menus.forEach(menu=>{
if(menu.id!==id){
menu.style.display="none"
}
})

let selected=document.getElementById(id)

if(selected.style.display==="block"){
selected.style.display="none"
}else{
selected.style.display="block"
}

}



/* DARK LIGHT MODE */

function toggleMode(){

document.getElementById("body").classList.toggle("light")

}
/* TOOL SEARCH */

document.getElementById("toolSearch").addEventListener("keyup", function() {

let input = this.value.toLowerCase()

let tools = document.querySelectorAll(".tool-item")

tools.forEach(function(tool){

let text = tool.textContent.toLowerCase()

if(text.includes(input)){
tool.style.display = "block"
}
else{
tool.style.display = "none"
}

})

})
/* TOOL SEARCH DROPDOWN */

const tools = [
"Dashboard",
"Drop 999",
"Fixit Bulk Edit",
"Fixit Quick Notes",
"Change Requests Edits",
"Carrier Commercial Updates",
"Fixit Recent Transfers",
"Create Quick Fixit",
"Delink and Resolve",
"WebApp/eSIM Logs",
"List Fixit by Itemtype",
"Web Payments Logs",
"Core Pcaps Retrieval",
"SMSC/HSS Pull",
"Fixit Analyser",
"Incident Communication (SMS)",
"Incident Communication (Email)",
"Status Page (Beta)"
];

const searchInput = document.getElementById("toolSearch");
const resultsBox = document.getElementById("searchResults");

searchInput.addEventListener("keyup", function(){

let input = this.value.toLowerCase();

resultsBox.innerHTML = "";

if(input === ""){
resultsBox.style.display="none";
return;
}

let filtered = tools.filter(tool =>
tool.toLowerCase().includes(input)
);

filtered.forEach(tool => {

let div = document.createElement("div");
div.innerText = tool;

div.onclick = function(){
searchInput.value = tool;
resultsBox.style.display="none";
}

resultsBox.appendChild(div);

});

resultsBox.style.display="block";

});
