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
