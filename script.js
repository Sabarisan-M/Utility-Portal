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
"Status Page (Beta)",
"Legal Request Log Pull"
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
if(tool === "Legal Request Log Pull"){
showPage('legal-request');
toggleMenu('legal');
}
}

resultsBox.appendChild(div);

});

resultsBox.style.display="block";

});



/* PAGE HISTORY - BACK BUTTON */

let pageHistory = ['dashboard'];

function goBack(){
if(pageHistory.length > 1){
pageHistory.pop();
let prev = pageHistory[pageHistory.length - 1];
document.getElementById('page-dashboard').style.display = 'none';
document.getElementById('page-legal-request').style.display = 'none';
document.getElementById('page-' + prev).style.display = 'block';
}
}

/* ============================================================
   PAGE NAVIGATION
   ============================================================ */

function showPage(pageId){
// track history
if(pageHistory[pageHistory.length-1] !== pageId){
pageHistory.push(pageId);
}

// hide all pages
document.getElementById("page-dashboard").style.display = "none";
document.getElementById("page-legal-request").style.display = "none";

// show selected page
document.getElementById("page-" + pageId).style.display = "block";

// reset legal page when navigating to it
if(pageId === "legal-request"){
resetLegalPage();
}
}


/* ============================================================
   LEGAL REQUEST LOG PULL - PAGE LOGIC
   ============================================================ */

// Show file preview as user types filename
document.addEventListener("DOMContentLoaded", function(){
const legalInput = document.getElementById("legalFilename");
if(legalInput){
legalInput.addEventListener("keyup", function(){
updateFilesPreview(this.value.trim());
});
}
});

function updateFilesPreview(filename){
const preview = document.getElementById("legalFilesPreview");
const fileList = document.getElementById("legalFileList");

if(!filename){
preview.style.display = "none";
return;
}

preview.style.display = "block";
fileList.innerHTML = `
<div class="legal-file-tag"><span>📥 Input:</span>C:\\legal\\${filename}.xlsx</div>
<div class="legal-file-tag"><span>📄 Intermediate TXT:</span>C:\\legal\\legalrequestresult${filename}.txt</div>
<div class="legal-file-tag"><span>📊 Intermediate Excel:</span>C:\\legal\\toquery${filename}.xlsx</div>
<div class="legal-file-tag"><span>✅ Final Output:</span>C:\\legal\\MSISDNresult${filename}.xlsx</div>
`;
}

function runLegalScript(){
const filename = document.getElementById("legalFilename").value.trim();

// validate input
if(!filename){
showError("Please enter a filename before running.");
return;
}

// hide error if shown
document.getElementById("legalError").style.display = "none";
document.getElementById("legalDownload").style.display = "none";

// disable run button
const runBtn = document.getElementById("legalRunBtn");
runBtn.disabled = true;
runBtn.innerText = "⏳ Running...";

// show status
document.getElementById("legalStatus").style.display = "flex";
document.getElementById("legalStatusText").innerText = "Running... Please wait";
document.getElementById("legalStatusSub").innerText = "This may take a few minutes depending on data size.";

// show steps
document.getElementById("legalSteps").style.display = "flex";
resetSteps();

// Simulate steps progress
// In real backend integration replace this with actual API call to your Flask/FastAPI backend
simulateSteps(filename);
}

function simulateSteps(filename){
// Step 1 - active immediately
setStepActive(1);

// ---- REPLACE THIS SECTION WITH REAL API CALL ----
// When your Flask backend is ready, replace simulateSteps with:
//
// fetch('http://YOUR_EC2_IP:5000/run', {
//   method: 'POST',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({filename: filename})
// })
// .then(response => response.blob())
// .then(blob => {
//   window.outputBlob = blob;
//   window.outputFilename = 'MSISDNresult' + filename + '.xlsx';
//   showDownload(filename);
// })
// .catch(err => showError(err.message));
//
// ---- END REPLACE SECTION ----

// Simulated step progression (remove when backend is ready)
setTimeout(() => { setStepDone(1); setStepActive(2); }, 2000);
setTimeout(() => { setStepDone(2); setStepActive(3); }, 5000);
setTimeout(() => { setStepDone(3); setStepActive(4); }, 8000);
setTimeout(() => {
setStepDone(4);
showDownload(filename);
}, 10000);
}

function setStepActive(num){
const step = document.getElementById("step" + num);
if(!step) return;
step.classList.add("active");
step.classList.remove("done");
step.querySelector(".step-icon").innerText = "⏳";
}

function setStepDone(num){
const step = document.getElementById("step" + num);
if(!step) return;
step.classList.remove("active");
step.classList.add("done");
step.querySelector(".step-icon").innerText = "✅";
}

function resetSteps(){
for(let i = 1; i <= 4; i++){
const step = document.getElementById("step" + i);
if(step){
step.classList.remove("active","done");
step.querySelector(".step-icon").innerText = "⏸";
}
}
}

function showDownload(filename){
// hide status
document.getElementById("legalStatus").style.display = "none";

// show download
document.getElementById("legalDownload").style.display = "flex";
document.getElementById("legalOutputFilename").innerText = "MSISDNresult" + filename + ".xlsx";

// reset run button
const runBtn = document.getElementById("legalRunBtn");
runBtn.disabled = false;
runBtn.innerText = "▶ Run Script";
}

function downloadOutput(){
// When backend is ready, this will download the actual file:
// const url = URL.createObjectURL(window.outputBlob);
// const a = document.createElement('a');
// a.href = url;
// a.download = window.outputFilename;
// a.click();

// For now shows placeholder message
alert("Backend not connected yet.\n\nWhen Flask backend is ready on EC2, the output file MSISDNresult" + document.getElementById("legalOutputFilename").innerText.replace("MSISDNresult","") + " will download automatically here.");
}

function showError(message){
const errorDiv = document.getElementById("legalError");
document.getElementById("legalErrorText").innerText = message;
errorDiv.style.display = "flex";

const runBtn = document.getElementById("legalRunBtn");
runBtn.disabled = false;
runBtn.innerText = "▶ Run Script";

document.getElementById("legalStatus").style.display = "none";
}

function resetLegalPage(){
document.getElementById("legalFilename").value = "";
document.getElementById("legalFilesPreview").style.display = "none";
document.getElementById("legalStatus").style.display = "none";
document.getElementById("legalSteps").style.display = "none";
document.getElementById("legalDownload").style.display = "none";
document.getElementById("legalError").style.display = "none";

const runBtn = document.getElementById("legalRunBtn");
runBtn.disabled = false;
runBtn.innerText = "▶ Run Script";

resetSteps();
}
