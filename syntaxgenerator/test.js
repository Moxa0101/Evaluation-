// ===============================
// apply.js - Unified & Optimized
// ===============================

// Tooltip setup
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Monaco Editor Setup
let editor;
require.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.52.0/min/vs" } });

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementsByClassName("generatedCode")[0], {
    value: getCodeSnippet("strategy_order"),
    language: "json",
    theme: "vs-dark",
    automaticLayout: true,
    fontSize: 18,
    minimap: { enabled: false },
    wordWrap: "on",
    scrollbar: { vertical: "hidden", horizontal: "hidden" }
  });
});

// Snippet generator
function getCodeSnippet(type) {
  if (type === "strategy_order") {
    return `{
  "type": "strategy_order",
  "exit_on_opposite": false,
  "is_tgt": false,
  "is_sl": false,
  "is_trail_set": false,
  "position_size": "{{strategy.position_size}}",
  "transaction_type": "{{strategy.order.action}}"
}`;
  }
  return `{
  "type": "${type}"
}`;
}

// Active Nav handling
let activeNav = "strategy_order";
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    activeNav = link.getAttribute("data-type");
    localStorage.setItem("activenav", JSON.stringify(activeNav));
    editor.setValue(getCodeSnippet(activeNav));
    resetUIForNav();
  });
});

// Reset UI fields when nav changes
function resetUIForNav() {
  const containers = [
    "#scriptsearchbox", "#optionSelection", "#premiumval", "#maxvariationCtn",
    "#AtmGap", "#expiryGap", "#expiryType", "#productType", "#quantityBox",
    "#limitPrice", "#triggetPrice", "#BtnGroup", "#toggleSwitchGroup"
  ];
  containers.forEach(sel => {
    const el = document.querySelector(sel);
    if (el) {
      el.style.display = "none";
      el.querySelectorAll("input,select").forEach(i => { i.value = ""; });
    }
  });

  // Special case: SquareOff / Cancel → always show ScriptType, Script, Product
  if (activeNav === "squareoff_position" || activeNav === "cancel_order") {
    ["#scriptType", "#scriptsearchbox", "#productType"].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.style.display = "block";
        el.querySelector("b").innerHTML = el.querySelector("b").innerHTML.replace("*", "Optional");
      }
    });
  }
}

// JSON Upsert helper
function upsertJson(key, value, quote = true) {
  if (!editor) return;
  let code = editor.getValue();
  const regex = new RegExp(`"${key}"\\s*:\\s*(".+?"|\\d+|true|false)`);
  const newVal = quote ? `"${value}"` : value;
  if (regex.test(code)) {
    code = code.replace(regex, `"${key}": ${newVal}`);
  } else {
    code = code.trim().replace(/}$/, `,\n  "${key}": ${newVal}\n}`);
  }
  editor.setValue(code);
}

// Buy/Sell buttons
document.querySelector(".buyBtn")?.addEventListener("click", () => {
  document.querySelector(".buyBtn").style.background = "green";
  document.querySelector(".sellBtn").style.background = "";
  upsertJson("transaction_type", "BUY", true);
});
document.querySelector(".sellBtn")?.addEventListener("click", () => {
  document.querySelector(".sellBtn").style.background = "red";
  document.querySelector(".buyBtn").style.background = "";
  upsertJson("transaction_type", "SELL", true);
});

// Switch toggles
["exit_on_opposite","is_tgt","is_sl","is_trail_set","is_rollover"].forEach((key,i)=>{
  const el=document.getElementById(`flexSwitchCheck${i+1}`);
  if(el){
    el.addEventListener("change",()=>upsertJson(key,el.checked,false));
  }
});

// Delete & Copy
document.getElementById("deleteBtn").addEventListener("click", () => {
  editor.setValue(getCodeSnippet(activeNav));
});
document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(editor.getValue()).then(()=>alert("Code copied!"));
});

// Script Search
const searchInput=document.getElementById("search");
const dropdown=document.getElementById("dropdown");
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJmcmNoX2lkIjoxLCJlbWFpbCI6ImRldjMuYWxnb2RlbHRhQGdtYWlsLmNvbSIsIm1vYmlsZV9ubyI6IjkzMTMxODM4NDciLCJjdXN0X2lkIjoiNzM1NTQ3IiwiZW52IjoibWFpbiIsInVzZXJfdHlwZSI6InVzZXIiLCJpYXQiOjE3NTYyODg4OTQsImV4cCI6MTc1NjM3NTI5NH0.rtQOXb5OZ6Cab9_JNnWe3_eVLp3b_xpvNYSbGspcRpQ"; // add your token
async function fetchScripts(query){
  if(!query) return [];
  let url="https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript";
  if(activeNav==="squareoff_position"||activeNav==="cancel_order"){
    url=""; // TODO: insert SquareOff/Cancel API URL
  }
  const res=await fetch(url,{
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":token},
    body:JSON.stringify({script:query,type:document.getElementById("dropdown1").value})
  });
  const data=await res.json();
  return data.data||[];
}
searchInput?.addEventListener("input", debounce(async(e)=>{
  const val=e.target.value;
  const suggestions=await fetchScripts(val);
  dropdown.innerHTML=suggestions.map(s=>`<li>${s.script||s}</li>`).join("");
  dropdown.style.display=suggestions.length?"block":"none";
},300));

dropdown?.addEventListener("click",(e)=>{
  if(e.target.tagName==="LI"){
    let selected=e.target.textContent.split("(")[0];
    searchInput.value=selected;
    upsertJson("script",selected,true);
    dropdown.innerHTML="";dropdown.style.display="none";
    if(activeNav==="strategy_order"||activeNav==="limit_order"||activeNav==="sl_order"){
      document.getElementById("productType").style.display="block";
    }
  }
});

// Product Dropdown
document.getElementById("productDropdown")?.addEventListener("change",function(){
  upsertJson("product",this.value,true);
  document.getElementById("quantityBox").style.display="block";
});

// Quantity
document.getElementById("quantityBox")?.addEventListener("input",function(){
  const q=Number(this.value);
  if(q<=0){document.getElementById("quantityError").style.display="block";hideDependents();return;}
  document.getElementById("quantityError").style.display="none";
  upsertJson("quantity",q,false);

  if(activeNav==="strategy_order"){
    document.getElementById("BtnGroup").style.display="block";
    document.getElementById("toggleSwitchGroup").style.display="block";
  }
  if(activeNav==="limit_order") document.getElementById("limitPrice").style.display="block";
  if(activeNav==="sl_order") document.getElementById("triggetPrice").style.display="block";
});
function hideDependents(){
  ["#BtnGroup","#toggleSwitchGroup","#limitPrice","#triggetPrice"].forEach(sel=>{
    const el=document.querySelector(sel);if(el) el.style.display="none";
  });
}

// Limit price
document.getElementById("priceLimit")?.addEventListener("input",function(){
  const n=Number(this.value);
  if(n<0){document.querySelector("#limitPrice #PriceError").style.display="block";return;}
  document.querySelector("#limitPrice #PriceError").style.display="none";
  upsertJson("price",n,false);
});

// Trigger price
document.getElementById("triggerprice")?.addEventListener("input",function(){
  const n=Number(this.value);
  if(n<0){document.querySelector("#triggetPrice #PriceError").style.display="block";return;}
  document.querySelector("#triggetPrice #PriceError").style.display="none";
  upsertJson("trigger_price",n,false);
});

// Debounce helper
function debounce(fn,delay){
  let t;return(...args)=>{clearTimeout(t);t=setTimeout(()=>fn.apply(this,args),delay);}
}
