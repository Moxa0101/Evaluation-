

//for tooltip to look good
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
  
})

function setActive(obj) {
  document.querySelectorAll('.syntax_generator').forEach(button => button.classList.remove('active'));
  obj.classList.add('active');
}


let editor;

require.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.52.0/min/vs" } });

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementsByClassName("generatedCode")[0], {
    value: `{
    "type": "strategy_order",
    "exit_on_opposite": false,
    "is_tgt": false,
    "is_sl": false,
    "is_trail_set": false,
    "position_size": "{{strategy.position_size}}",
    "transaction_type": "{{strategy.order.action}}"
}`,
    language: "json",
    theme: "vs-dark",
    automaticLayout: true,
    suggestOnTriggerCharacters: false,
    quickSuggestions: false,
    wordBasedSuggestions: false,
    parameterHints: { enabled: false },
    inlineSuggest: { enabled: false },
    fontSize: 18,
    minimap: { enabled: false },
    wordWrap: "on",
    scrollbar: {
      vertical: "hidden",
      horizontal: "hidden",
      handleMouseWheel: false
    },
  });
});

const originalcode=`{
    "type": "strategy_order",
    "exit_on_opposite": false,
    "is_tgt": false,
    "is_sl": false,
    "is_trail_set": false,
    "position_size": "{{strategy.position_size}}",
    "transaction_type": "{{strategy.order.action}}"

}`
document.getElementById("copyBtn");

document.getElementById("deleteBtn").addEventListener("click",function(){
  
  editor.setValue(originalcode);

  // reset dropdown to index 0
  let scriptType = document.getElementById("dropdown1");
  if (scriptType) scriptType.selectedIndex = 0;
})

const copyBtn = document.getElementById("copyBtn");

copyBtn?.addEventListener("click", function () {
  if (!editor) return;

  // Get the current editor content
  const code = editor.getValue();

  // Use navigator clipboard API to copy
  navigator.clipboard.writeText(code)
    .then(() => {
      alert("Code copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
});


function resetIfHidden(container) {
  if (container && container.style.display === "none") {
    container.querySelectorAll("input, select, textarea").forEach(el => {
      if (el.type === "checkbox" || el.type === "radio") {
        el.checked = false;
      } else {
        el.value = "";
      }
    });
  }
}


let strategyOrder = document.getElementById("strategyOrder");
let limitOrder = document.getElementById("limitOrder");
let slOrder = document.getElementById("slOrder");
let sqaureOf = document.getElementById("sqaureOf");
let cancelOrder = document.getElementById("cancelOrder");

function setActive(obj) {
  document.querySelectorAll('.syntax_generator').forEach(button => button.classList.remove('active'));
  obj.classList.add('active');
}

function showStrategyOrder() {
  document.getElementsByClassName("card1")[0].style.display = "block";

}

let dropdown1 = document.getElementById("dropdown1");


function hideAndResetAll() {
  const containers = [
    "EQOption2","showNumberBox","quantityEnterShow",
    "textPlusDropdown2","textPlusDropdown3","timeline",
    "rolloverSwitch","targetDropdownCtn","target_value",
    "stoploss_value","stoplossDropdownCtn","trailingDropdownCtn",
    "trailingtrigger_value","trailinggap_value","trailingpoint_value",
    "rollover_value","rollover_time","productType","productOnselect",
    "expiryGap","CEpremium","CEcontentreuse","maxvariation"
  ];

  containers.forEach(key => {
    let el = document.getElementById(key) || document.getElementsByClassName(key)[0];
    if (el) {
      el.style.display = "none";
      // reset inputs inside container
      el.querySelectorAll("input, select, textarea").forEach(input => {
        if (input.tagName === "SELECT") {
          input.selectedIndex = 0;
        } else if (input.type === "checkbox" || input.type === "radio") {
          input.checked = false;
        } else {
          input.value = "";
        }
      });
    }
  });

  // also clear search input explicitly
  let search = document.getElementById("search");
  if (search) search.value = "";
}

dropdown1.addEventListener("change", () => {
 hideAndResetAll();
  //  const containersToReset = [
  //       "rollover_value",
  //       "target_value",
  //       "stoploss_value",
  //       "trailingtrigger_value",
  //       "trailinggap_value",
  //       "trailingpoint_value",
  //       "rollover_time",
  //       "productType",
  //       "productOnselect",
  //       "expiryGap",
  //       "CEpremium",
  //       "CEcontentreuse",
  //       "showNumberBox" 
  //   ];

  //   containersToReset.forEach(idOrClass => {
  //       const el = document.getElementById(idOrClass) || document.getElementsByClassName(idOrClass)[0];
  //       resetIfHidden(el);
  //   });
  //document.getElementById("EQOption2").innerHTML="";
  //document.getElementById("showNumberBox").style.display="none";
  //document.getElementById("quantityEnterShow").style.display="none";
   
    document.getElementById("search").value="";
    document.getElementsByClassName("timeline")[0].style.display="none";
    document.getElementById("search").value="";
    document.getElementById("rolloverSwitch").style.display="none"
    document.getElementById("targetDropdownCtn").style.display="none";
    document.getElementById("target_value").style.display="none";
    document.getElementById("stoploss_value").style.display="none";
    document.getElementById("stoplossDropdownCtn").style.display="none";
    document.getElementById("trailingDropdownCtn").style.display="none";
    document.getElementById("trailingtrigger_value").style.display="none";
    document.getElementById("trailinggap_value").style.display="none";
    document.getElementById("trailingpoint_value").style.display="none";
    document.getElementById("rollover_value").style.display="none";
    document.getElementById("rollover_time").style.display="none";
    document.getElementById("productType").style.display="none";
    document.getElementById("productOnselect").style.display="none";
    document.getElementsByClassName("expiryGap")[0].style.display="none";
    document.getElementsByClassName("CEpremium")[0].style.display="none";
    document.getElementById("CEcontentreuse").style.display="none";
    document.getElementsByClassName("maxvariation")[0].style.display="none";
    resetIfHidden( document.getElementById("rollover_value"));

  if (dropdown1.value === "EQ") {
    document.getElementsByClassName("textPlusDropdown3")[0].style.display = "none";
    document.getElementsByClassName("textPlusDropdown2")[0].style.display = "block";
    document.getElementById("EQOption2").style.display="block"

    equitySelection();
    
    console.log("GO IN EQ")


  }

  else if (dropdown1.value === "FUT") {
    document.getElementsByClassName("textPlusDropdown3")[0].style.display = "none";
    document.getElementsByClassName("textPlusDropdown2")[0].style.display = "block";
    document.getElementById("EQOption2").style.display="none"
    document.getElementById("showNumberBox").style.display="none";
    document.getElementById("quantityEnterShow").style.display="none";
   console.log("GO IN FUTURE");
    futureSelection();


  }

  else if (dropdown1.value === "CE") {
    
document.getElementsByClassName("textPlusDropdown3")[0].style.display = "block";
    document.getElementsByClassName("textPlusDropdown2")[0].style.display = "none";
    document.getElementById("EQOption2").style.display="none"
    document.getElementById("showNumberBox").style.display="none";
    document.getElementById("quantityEnterShow").style.display="none";
      console.log(" GO INCE")

    CEselection();

  }
  else if (dropdown1.value == "PE") {
    document.getElementsByClassName("textPlusDropdown3")[0].style.display = "block";
    document.getElementsByClassName("textPlusDropdown2")[0].style.display = "none";
    document.getElementById("EQOption2").style.display="none"
    document.getElementById("showNumberBox").style.display="none";
    document.getElementById("quantityEnterShow").style.display="none";

      console.log("GO IN PE")

    CEselection();

  }

})


//adding to script type code snippet 
dropdown1.addEventListener("change", function () {
  const selectedValue = this.value;
  if (!selectedValue || !editor) return;

  let currentValue = editor.getValue();
  //chaecks by regex that value already exist then just replace and on change removes any value afterwards
 if (/"script_type"\s*:\s*".*?"/.test(currentValue)) {
    currentValue = currentValue.replace(
      /("script_type"\s*:\s*").*?(")/,
      `$1${selectedValue}$2`
    );
    //makes isrollover false
    currentValue = currentValue.replace(/("is_rollover"\s*:\s*false).*[\s\S]*?\}/, `$1\n}`);


  } else {
  // Remove the last closing brace
  currentValue = currentValue.trim();
  if (currentValue.endsWith("}")) {
    currentValue = currentValue.slice(0, -1);
  }

  // Add new line with snippet and closing brace
   currentValue += ",\n  \t" + `"script_type":"${selectedValue}"` + ",\n \t" + `"is_rollover":${false}  \n }` ;
  }
  editor.setValue(currentValue);

});


//adding code to snipper when script type is CE or PE
let dropdown2 = document.getElementById("atmdropdown");
dropdown2.addEventListener("change", function () {
  document.getElementsByClassName("textPlusDropdown2")[0].style.display = "block";
  let selectedValue = this.value;
  if (!selectedValue || !editor) return;

  let currentValue = editor.getValue();
  if (/"Option_Selection"\s*:\s*".*?"/.test(currentValue)) {
    currentValue = currentValue.replace(
      /("Option_Selection"\s*:\s*").*?(")/,
      `$1${selectedValue}$2`
    );
  } else {

    // Remove the last closing brace
    currentValue = currentValue.trim();
    if (currentValue.endsWith("}")) {
      currentValue = currentValue.slice(0, -1);
    }

    // Add new line with snippet and closing brace
     currentValue += ",\n  \t" + `"Option_Selection":"${selectedValue}"  \n }`;
  }
  editor.setValue(currentValue);
});


function equitySelection(){
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJmcmNoX2lkIjoxLCJlbWFpbCI6ImRldjMuYWxnb2RlbHRhQGdtYWlsLmNvbSIsIm1vYmlsZV9ubyI6IjkzMTMxODM4NDciLCJjdXN0X2lkIjoiNzM1NTQ3IiwiZW52IjoibWFpbiIsInVzZXJfdHlwZSI6InVzZXIiLCJpYXQiOjE3NTYxNDE3NDMsImV4cCI6MTc1NjIyODE0M30.cj21v3sS2AGM8Unulg0mL3C3rqWF7FzLsEIjrb9LHgQ";
const searchInput = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
document.addEventListener('click', (e) => {
  // Check if click is outside the input and dropdown
  if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Simple debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Fetch API suggestions
async function fetchSuggestions(query) {
  if (!query) {
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
    return;
  }

  let scriptType = document.getElementById("dropdown1")?.value;
  try {
    const res = await fetch("https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        script: query,
        type: scriptType
      })
    });

    const data = await res.json();
    const suggestions = data.data;


    dropdown.innerHTML = suggestions.map(item => `<li>${item.script} (${item.exchange})</li>`).join('');
    dropdown.style.display = suggestions.length ? 'block' : 'none';

  }
  catch (err) {
    console.error(err);
  }
}




// Add click selection
dropdown?.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    let selectedText = e.target.textContent;
    searchInput.value = selectedText;
    // remove everything after "("
    if (selectedText.includes("(")) {
      selectedText = selectedText.split("(")[0];
    }

    dropdown.style.display = 'none';

  //document.getElementById("EQOption2")?.innerHTML="";
  document.getElementById("showNumberBox").innerHTML="";
  let currentValue = editor.getValue().trim();

// If "script" already exists → replace only
    if (/"script"\s*:\s*".*?"/.test(currentValue)) {
      currentValue = currentValue.replace(
        /("script"\s*:\s*").*?(")[\s\S]*$/,
        `$1${selectedText}$2\n}`
      );


    } 

    else {
      // Remove last } if present
      if (currentValue.endsWith("}")) {
        currentValue = currentValue.slice(0, -1).trim();
      }

      // Remove trailing comma if any
      currentValue = currentValue.replace(/,\s*$/, "");

      // Append cleanly
      currentValue = currentValue + `,\n\t"script":"${selectedText}"\n}`;
    }

    editor.setValue(currentValue);
  }
});

searchInput.addEventListener('input', debounce(e => {
  fetchSuggestions(e.target.value);
}, 300));


//this is script option the one with dropdown and API onchange of that shows one dropdown
if(dropdown1.value === "EQ"){
searchInput.addEventListener("change",function(){
  let showDropdown=document.getElementById("EQOption2");
  if(dropdown1.value==="EQ"){
  showDropdown.innerHTML =
  `<b >Product <span class="text-muted">*</span></b>
  <div class="mt-2">
  <select id="productDropdown">
  <option selected hidden disabled>Select Product</option>
    <option value="INTRADAY">INTRADAY</option>
    <Option value="CARRYFORWARD">CARRYFORWARD</Option>
    <Option value="DELIVERY">DELIVERY</Option>
    <Option value="MARGIN">MARGIN</Option>
  </select>
  </div>`
  }
  //if productdropdown changes value this will run
    let productDropdown=document.getElementById("productDropdown");
    productDropdown?.addEventListener("change",function(){
          console.log("here")
          let selectedValue = this.value;
          if (!selectedValue || !editor) return;

          //this will add or replace in code snippet
          let currentValue = editor.getValue();
          if (/"product"\s*:\s*".*?"/.test(currentValue)) {
            currentValue = currentValue.replace(
              /("product"\s*:\s*").*?(")/,
              `$1${selectedValue}$2`
            );
          } 
            else {
            // Remove the last closing brace
            currentValue = currentValue.trim();
            if (currentValue.endsWith("}")) {
              currentValue = currentValue.slice(0, -1);
            }
            currentValue = currentValue.replace(/,\s*$/, "");

                // Append new script value
                currentValue+= `,\n \t"product":"${selectedValue}" \n}`;
            }
           
            editor.setValue(currentValue);
            
            let numberbox = document.getElementById("showNumberBox");
            numberbox.style.display="block"
            numberbox.innerHTML = `
              <b class="mt-">Quantity <span class="text-muted">*</span></b>
              <div>
                <input type="number" id="quantityBox" class="mt-2" placeholder="Enter Quantity">
                <small id="quantityError" style="color:red; display:none;">Quantity must be greater than 0.</small>
              </div>`;

                let quantityNumber = document.getElementById("quantityBox");
                let quantityError = document.getElementById("quantityError");

          quantityNumber?.addEventListener("input", function () {

            
            //for error message
            if (quantityNumber.value <= 0) {
              console.log("if")
                quantityError.style.display = "block"; // just show error
                document.getElementById("CEcontentreuse").style.display="none";
                document.getElementById("CEdropdown").style.display="none";
                document.getElementById("quantityEnterShow").style.display="none";
                document.getElementById("target_value").style.display="none";
                document.getElementById("stoploss_value").style.display="none";
                document.getElementById("stoplossDropdownCtn").style.display="none";
                document.getElementById("targetDropdownCtn").style.display="none";
                document.getElementById("trailingDropdownCtn").style.display="none";
                document.getElementById("trailingtrigger_value").style.display="none";
                document.getElementById("trailingpoint_value").style.display="none";
                document.getElementById("trailinggap_value").style.display="none";
                
              } 
              
              //if valid value then show switches and switch's functioning
              else {
                console.log("else")
                quantityError.style.display = "none";  // hide error
                document.getElementById("quantityEnterShow").style.display="block";
                console.log(document.getElementById("quantityEnterShow").value)



               
                        //buy sell button color switch
                          let buy=document.getElementsByClassName("buyBtn")[0];
                          let sell=document.getElementsByClassName("sellBtn")[0];
                        sell.style.background="";
                         buy.style.background="";
                          buy.addEventListener("click",function(){

                            buy.style.background="green";
                            sell.style.background="";
                            let code = editor.getValue();
                              if (/"transaction_type"\s*:\s*".*?"/.test(code)) {
                                  code = code.replace(/("transaction_type"\s*:\s*").*?"/, `$1BUY"`);
                              } else {
                                  // If not present, you can optionally add it
                                  code = code.replace(/(\{)/, `$1\n  "transaction_type":"BUY",`);
                              }
                              editor.setValue(code);
                          });

                          sell.addEventListener("click",function(){
                            
                            sell.style.background="red";
                            buy.style.background="";
                            let code = editor.getValue();
                              if (/"transaction_type"\s*:\s*".*?"/.test(code)) {
                                  code = code.replace(/("transaction_type"\s*:\s*").*?"/, `$1SELL"`);
                              } else {
                                  // If not present, you can optionally add it
                                  code = code.replace(/(\{)/, `$1\n  "transaction_type":"SELL",`);
                              }
                              editor.setValue(code);
                          })
              

              //exit on purpose switch toggle
                const exitOnPurposeSwitch = document.getElementById('flexSwitchCheck1');
                
                function toggleExitOnOpposite() {
                    let code = editor.getValue();
                    code = code.replace(
                        /("exit_on_opposite"\s*:\s*)(true|false)/,
                        `$1${exitOnPurposeSwitch.checked}`
                    );
                    
                    editor.setValue(code);
                }
                exitOnPurposeSwitch?.addEventListener('change', toggleExitOnOpposite);

                //target switch toggle
                const   targetSwitch = document.getElementById('flexSwitchCheck2');
                function toggleIsTgt() {
                    let code = editor.getValue();

                    // Toggle exit_on_opposite in the JSON string
                     code = code.replace(
                        /("is_tgt"\s*:\s*)(true|false)/,
                        `$1${targetSwitch.checked}`
                    );
                    editor.setValue(code);
                    if(!(targetSwitch.checked)){
                      document.getElementById("targetdropdown").selectedIndex=0;
                      document.getElementById("target_value").value="";
                    }
                }

                //onchange toggles the switch, call the function and also shows dropdown
                let dropdownofTarget=document.getElementById("targetDropdownCtn");
                
                function targerSwitchReflect(){
                  dropdownofTarget.style.display = targetSwitch.checked ? 'block' : 'none';
                  if(dropdownofTarget.style.display==="block"){
                            document.getElementById("targetdropdown")?.addEventListener("change",function(){

                                         let selectedtargetValue = this.value;
                                            if (!selectedtargetValue || !editor) return;

                                            //this will add or replace in code snippet
                                            let currentValue = editor.getValue();
                                            if (/"tgt_type"\s*:\s*".*?"/.test(currentValue)) {
                                              currentValue = currentValue.replace(
                                                /("tgt_type"\s*:\s*").*?(")/,
                                                `$1${selectedtargetValue}$2`
                                              );
                                            } 
                                              else {
                                              // Remove the last closing brace
                                              currentValue = currentValue.trim();
                                              if (currentValue.endsWith("}")) {
                                                currentValue = currentValue.slice(0, -1);
                                              }
                                              currentValue = currentValue.replace(/,\s*$/, "");

                                                  // Append new script value
                                                  currentValue+= `,\n \t"tgt_type":"${selectedtargetValue}" \n}`;
                                              }
                                            
                                            editor.setValue(currentValue);


                              document.getElementById("target_value").style.display="block";

                                          var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                                           tooltipTriggerList.map(function (tooltipTriggerEl) {
                                            return new bootstrap.Tooltip(tooltipTriggerEl)
                                            
                                          })

                                           let targetValBox = document.getElementById("targetValbox");
                                           let targetErr = document.getElementById("targetError");


                                            targetValBox?.addEventListener("input", function () {
                                              let targetValue=this.value.trim();
                                              let currentValue=editor.getValue().trim();

                                                if(targetValue<0){
                                                  targetErr.style.display="block";
                                                }
                                                else{
                                                  targetErr.style.display="none";
                                                }

                                              if(!targetValue){
                                                currentValue = currentValue.replace(/,?\s*"tgt_value"\s*:\s*\d+\s*/g, "");
                                                // Also clean up trailing commas before }
                                                currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                editor.setValue(currentValue);
                                                return;
                                              }

                                              if(/\"tgt_value\"\s*:\s*\d*/.test(currentValue)){
                                                currentValue = currentValue.replace(
                                                /("tgt_value"\s*:\s*)\d*/,
                                                `$1${targetValue}`
                                                ); 
                                              }
                                              else{
                                                if (currentValue.endsWith("}")) {
                                                        currentValue = currentValue.slice(0, -1).trim();
                                                      }
                                                      currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                      currentValue = currentValue + `,\n\t"tgt_value":${targetValue}\n}`;
                                                }

                                              editor.setValue(currentValue);

                                                
                                            });
      
                                 
                                      });
                  }
                  else{
                    document.getElementById("target_value").style.display="none";
                    let code = editor.getValue();
                        code = code.replace(/,\s*"tgt_type"\s*:\s*".*?"/g, "");
                        code = code.replace(/,\s*"tgt_value"\s*:\s*[^,}]+/g, "");
                        editor.setValue(code);
                  }

                };
                targetSwitch.addEventListener("change",function(){
                  toggleIsTgt();
                  targerSwitchReflect();
                })



                //check the val true or false and shows box according

                //stoploss switch
                const   stoplossSwitch = document.getElementById('flexSwitchCheck3');
                function toggleIsSl() {
                    let code = editor.getValue();

                    // Toggle stoploss in the JSON string
                              code = code.replace(
                              /("is_sl"\s*:\s*)(true|false)/,
                              `$1${stoplossSwitch.checked}`
                              );
                          editor.setValue(code);
                          if(!(stoplossSwitch.checked)){
                            document.getElementById("stoplossdropdown").selectedIndex=0;
                            document.getElementById("stoploss_value").value="";
                          }

                }

                //onchange toggles the switch, call the function and also shows dropdown
                function stoplossSwitchReflect(){
                  let dropdownOfStoploss=document.getElementById("stoplossDropdownCtn");
                  dropdownOfStoploss.style.display = stoplossSwitch.checked ? 'block' : 'none';

                  if(dropdownOfStoploss.style.display==="block"){
                            document.getElementById("stoplossdropdown")?.addEventListener("change",function(){

                                         let selectedstoplossValue = this.value;
                                            if (!selectedstoplossValue || !editor) return;

                                            //this will add or replace in code snippet
                                            let currentValue = editor.getValue();
                                            if (/"sl_type"\s*:\s*".*?"/.test(currentValue)) {
                                              currentValue = currentValue.replace(
                                                /("sl_type"\s*:\s*").*?(")/,
                                                `$1${selectedstoplossValue}$2`
                                              );
                                            } 
                                              else {
                                              // Remove the last closing brace
                                              currentValue = currentValue.trim();
                                              if (currentValue.endsWith("}")) {
                                                currentValue = currentValue.slice(0, -1);
                                              }
                                              currentValue = currentValue.replace(/,\s*$/, "");

                                                  // Append new script value
                                                  currentValue+= `,\n \t"sl_type":"${selectedstoplossValue}" \n}`;
                                              }
                                            
                                            editor.setValue(currentValue);


                              document.getElementById("stoploss_value").style.display="block";
                                           let stoplossValbox = document.getElementById("stoplossValbox");
                                           let stoplossErr = document.getElementById("stoplossError");


                                            stoplossValbox?.addEventListener("input", function () {
                                              let stoplossValue=this.value.trim();
                                              let currentValue=editor.getValue().trim();

                                                if(stoplossValue<0){
                                                  stoplossErr.style.display="block";
                                                }
                                                else{
                                                  stoplossErr.style.display="none";
                                                }

                                              if(!stoplossValue){
                                                currentValue = currentValue.replace(/,?\s*"sl_value"\s*:\s*\d+\s*/g, "");
                                                // Also clean up trailing commas before }
                                                currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                editor.setValue(currentValue);
                                                return;
                                              }

                                              if(/\"sl_value\"\s*:\s*\d*/.test(currentValue)){
                                                currentValue = currentValue.replace(
                                                /("sl_value"\s*:\s*)\d*/,
                                                `$1${stoplossValue}`
                                                ); 
                                              }
                                              else{
                                                if (currentValue.endsWith("}")) {
                                                        currentValue = currentValue.slice(0, -1).trim();
                                                      }
                                                      currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                      currentValue = currentValue + `,\n\t"sl_value":${stoplossValue}\n}`;
                                                }

                                              editor.setValue(currentValue);

                                                
                                            });
      
                                 
                                      });
                  }
                  else{
                    document.getElementById("stoploss_value").style.display="none";
                    let code = editor.getValue();

                        code = code.replace(/,\s*"sl_type"\s*:\s*".*?"/g, "");
                        code = code.replace(/,\s*"sl_value"\s*:\s*[^,}]+/g, "");
                        editor.setValue(code);
                  }


                };

                stoplossSwitch.addEventListener("change",function(){
                  toggleIsSl();
                  stoplossSwitchReflect();
                  
                })

                //trailing switch
                const   trailingSwitch = document.getElementById('flexSwitchCheck4');
                
                function toggleIsTrailSet() {
                    let code = editor.getValue();
                      code = code.replace(
                      /("is_trail_set"\s*:\s*)(true|false)/,
                      `$1${trailingSwitch.checked}`
                      );

                    editor.setValue(code);

                    if(!(trailingSwitch.checked)){
                    document.getElementById("trailingdropdown").selectedIndex=0;
                    document.getElementById("trailingtrigger_value").value="";
                    document.getElementById("trailinggap_value").value="";
                    document.getElementById("trailingpoint_value").value="";
                    }
                }
                function trailswitchReflect(){
                  let dropdownOfTrailing=document.getElementById("trailingDropdownCtn");
                  dropdownOfTrailing.style.display = trailingSwitch.checked ? 'block' : 'none';

                      if(dropdownOfTrailing.style.display==="block"){

                                document.getElementById("trailingdropdown")?.addEventListener("change",function(){

                                            let selectedtrailingValue = this.value;
                                                if (!selectedtrailingValue || !editor) return;

                                                //this will add or replace in code snippet
                                                let currentValue = editor.getValue();
                                                if (/"trail_type"\s*:\s*".*?"/.test(currentValue)) {
                                                  currentValue = currentValue.replace(
                                                    /("trail_type"\s*:\s*").*?(")/,
                                                    `$1${selectedtrailingValue}$2`
                                                  );
                                                } 
                                                  else {
                                                  // Remove the last closing brace
                                                  currentValue = currentValue.trim();
                                                  if (currentValue.endsWith("}")) {
                                                    currentValue = currentValue.slice(0, -1);
                                                  }
                                                  currentValue = currentValue.replace(/,\s*$/, "");

                                                      // Append new script value
                                                      currentValue+= `,\n \t"trail_type":"${selectedtrailingValue}" \n}`;
                                                  }
                                                
                                                editor.setValue(currentValue);


                                              document.getElementById("trailingtrigger_value").style.display="block";
                                              let  trailtriggerValbox= document.getElementById("trailtriggerValbox");
                                              let trailTriggerError = document.getElementById("trailTriggerError");


                                                trailtriggerValbox?.addEventListener("input", function () {

                                                  let trailTriggerValue=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailTriggerValue<0){
                                                      trailTriggerError.style.display="block";

                                                      document.getElementById("trailinggap_value").style.display="none";

                                                    }
                                                    else{
                                                      trailTriggerError.style.display="none";
                                                      document.getElementById("trailinggap_value").style.display="block";
                                                    }

                                                  if(!trailTriggerValue){
                                                    currentValue = currentValue.replace(/,?\s*"trail_trigger"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_trigger\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_trigger"\s*:\s*)\d*/,
                                                    `$1${trailTriggerValue}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_trigger":${trailTriggerValue}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                 
                                                 
                                                  //trail gap number box show
                                                document.getElementById("trailGapValbox")?.addEventListener("input",function(){
                                                  let trailgapError=document.getElementById("trailGapError");
                                                  let trailGapValue=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailGapValue<0){
                                                      trailgapError.style.display="block";
                                                      document.getElementById("trailingpoint_value").style.display="none";

                                                    }
                                                    else{
                                                      trailgapError.style.display="none";
                                                      document.getElementById("trailingpoint_value").style.display="block";
                                                    }

                                                  if(!trailGapValue){
                                                    currentValue = currentValue.replace(/,?\s*"trail_gap"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_gap\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_gap"\s*:\s*)\d*/,
                                                    `$1${trailGapValue}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_gap":${trailGapValue}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                  })   

                                                  //document.getElementById("trailingpoint_value").style.display="block"

                                                  //trail point input box
                                                  document.getElementById("trailPointValbox")?.addEventListener("input",function(){
                                                  let trailpointError=document.getElementById("trailPointError");
                                                  let trailpointVal=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailpointVal<0){
                                                      trailpointError.style.display="block";

                                                    }
                                                    else{
                                                      trailpointError.style.display="none";
                                                      }

                                                  if(!trailpointVal){
                                                    currentValue = currentValue.replace(/,?\s*"trail_point"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_point\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_point"\s*:\s*)\d*/,
                                                    `$1${trailpointVal}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_point":${trailpointVal}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                  })   


                                                  
                                                });
                                        });


                      }
                      else{
                        document.getElementById("trailingtrigger_value").style.display="none";
                        document.getElementById("trailinggap_value").style.display="none";
                        document.getElementById("trailingpoint_value").style.display="none";
                        let code = editor.getValue();

                            code = code.replace(/,\s*"trail_type"\s*:\s*".*?"/g, "");
                            code = code.replace(/,\s*"trail_trigger"\s*:\s*[^,}]+/g, "");
                            code = code.replace(/,\s*"trail_gap"\s*:\s*[^,}]+/g, "");
                            code = code.replace(/,\s*"trail_point"\s*:\s*[^,}]+/g, "");

                            editor.setValue(code);
                      }
                }
                trailingSwitch.addEventListener("change",function(){
                  toggleIsTrailSet();
                  trailswitchReflect();
                })
              } 

              //it adds and modifyes in code snippet
            let quantityValue = this.value.trim();
            let currentValue = editor.getValue().trim();
            if (!quantityValue) {
              currentValue = currentValue.replace(/,?\s*"quantity"\s*:\s*\d+\s*/g, "");
              // Also clean up trailing commas before }
              currentValue = currentValue.replace(/,\s*}/, "\n}");
              editor.setValue(currentValue);
              return;
            }

            if (/\"quantity\"\s*:\s*\d*/.test(currentValue)) {
              // If already present => replace value only
              currentValue = currentValue.replace(
                /("quantity"\s*:\s*)\d*/,
                `$1${quantityValue}`
              );
            } 
            else {
              // If not present then add it at the end
              if (currentValue.endsWith("}")) {
                currentValue = currentValue.slice(0, -1).trim();
              }
              currentValue = currentValue.replace(/,(\s*})/, "$1");
              currentValue = currentValue + `,\n\t"quantity":${quantityValue}\n}`;
            }

           

            document.querySelectorAll('input[type="checkbox"]').forEach(toggleBtn => {
              toggleBtn.checked = false; // turn off all switches
              document.getElementById("targetdropdown").selectedIndex=0;
              document.getElementById("stoplossdropdown").selectedIndex=0;
              document.getElementById("trailingdropdown").selectedIndex=0;
              document.getElementById("target_value").value="";
              document.getElementById("stoploss_value").value="";
              document.getElementById("trailingtrigger_value").value="";
              document.getElementById("trailinggap_value").value="";
              document.getElementById("trailingpoint_value").value="";
               targerSwitchReflect();
               stoplossSwitchReflect();
               trailswitchReflect();

            });

            document.getElementById("targetdropdown").style.selectedValue="Select Target Type";
              

            // Remove related switch values from JSON
            currentValue = currentValue
              .replace(/"exit_on_opposite"\s*:\s*(true|false),?/g, '"exit_on_opposite": false,')
              .replace(/"is_tgt"\s*:\s*(true|false),?/g, '"is_tgt": false,')
              .replace(/"tgt_type"\s*:\s*".*?",?/g, "")
              .replace(/"tgt_value"\s*:\s*\d*/, "")
              .replace(/"is_sl"\s*:\s*(true|false),?/g, '"is_sl": false,')
              .replace(/"sl_type"\s*:\s*".*?",?/g, "")
              .replace(/"sl_value"\s*:\s*\d*/, "")
              .replace(/"is_trail_set"\s*:\s*(true|false),?/g, '"is_trail_set": false,')
              .replace(/"trail_type"\s*:\s*".*?",?/g, "")
              .replace(/"trail_trigger"\s*:\s*\d*/, "")
              .replace(/"trail_gap"\s*:\s*\d*/, "")
              .replace(/"trail_point"\s*:\s*\d*/, "");
                        
               editor.setValue(currentValue);
               
          });
    });
});
}
}



function futureSelection(){ 
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJmcmNoX2lkIjoxLCJlbWFpbCI6ImRldjMuYWxnb2RlbHRhQGdtYWlsLmNvbSIsIm1vYmlsZV9ubyI6IjkzMTMxODM4NDciLCJjdXN0X2lkIjoiNzM1NTQ3IiwiZW52IjoibWFpbiIsInVzZXJfdHlwZSI6InVzZXIiLCJpYXQiOjE3NTYxNDE3NDMsImV4cCI6MTc1NjIyODE0M30.cj21v3sS2AGM8Unulg0mL3C3rqWF7FzLsEIjrb9LHgQ";
  const searchInput = document.getElementById('search');
  const dropdown = document.getElementById('dropdown');
  document.addEventListener('click', (e) => {
    // Check if click is outside the input and dropdown
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  // Simple debounce function
  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Fetch API suggestions
  async function fetchSuggestions(query) {
    if (!query) {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
      return;
    }

    let scriptType = document.getElementById("dropdown1")?.value;
    try {
      const res = await fetch("https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          script: query,
          type: scriptType
        })
      });

      const data = await res.json();
      const suggestions = data.data;


      dropdown.innerHTML = suggestions.map(item => `<li>${item.script} (${item.exchange})</li>`).join('');
      dropdown.style.display = suggestions.length ? 'block' : 'none';

    }
    catch (err) {
      console.error(err);
    }
  }

  // Add click selection
  dropdown?.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      let selectedText = e.target.textContent;
      searchInput.value = selectedText;
      // remove everything after "("
      if (selectedText.includes("(")) {
        selectedText = selectedText.split("(")[0];
      }

      dropdown.style.display = 'none';
      if(dropdown1.value === "FUT"){
        console.log(dropdown1.value)
      document.getElementsByClassName("expiryGap")[0].style.display="block";}

    //document.getElementById("EQOption2")?.innerHTML="";
    //document.getElementById("showNumberBox").innerHTML="";
    let currentValue = editor.getValue().trim();

// If "script" already exists → replace only
    if (/"script"\s*:\s*".*?"/.test(currentValue)) {
      currentValue = currentValue.replace(
        /("script"\s*:\s*").*?(")[\s\S]*$/,
        `$1${selectedText}$2\n}`
      );


    } 

    else {
      // Remove last } if present
      if (currentValue.endsWith("}")) {
        currentValue = currentValue.slice(0, -1).trim();
      }

      // Remove trailing comma if any
      currentValue = currentValue.replace(/,\s*$/, "");

      // Append cleanly
      currentValue = currentValue + `,\n\t"script":"${selectedText}"\n}`;
    }

    editor.setValue(currentValue);
  }
});

searchInput.addEventListener('input', debounce(e => {
  fetchSuggestions(e.target.value);
}, 300));


      document.getElementById("futExpiryGap").addEventListener("input",function(){
      if(dropdown1.value==="FUT"){
      document.getElementById("productType").style.display="block"}
      document.getElementsByClassName("timeline")[0].style.display="block";
      document.getElementById("timelineDropdown").value = "monthly";
      document.getElementById("timelineDropdown").disabled = true;

      let futExpiryGapError=document.getElementById("futExpiryGapError");
      let futExpiryGapVal=this.value.trim();
      let currentValue=editor.getValue().trim();

      if(futExpiryGapVal<0){
      futExpiryGapError.style.display="block";

      }
    else{
     futExpiryGapError.style.display="none";
    }

    if(!futExpiryGapVal){
    currentValue = currentValue.replace(/,?\s*"expiry_gap"\s*:\s*\d+\s*/g, "")
                                .replace(/"expiry_time"\s*:\s*".*?",?/g, "");
       // Also clean up trailing commas before }
     currentValue = currentValue.replace(/,\s*}/, "\n}");
     editor.setValue(currentValue);
     document.getElementsByClassName("timeline")[0].style.display="none";
      return;
    }
    if(/\"expiry_gap\"\s*:\s*\d*/.test(currentValue)){
    currentValue = currentValue.replace(
     /("expiry_gap"\s*:\s*)\d*/,
    `$1${futExpiryGapVal}`
     ); 
    }
    else{
    if (currentValue.endsWith("}")) {
    currentValue = currentValue.slice(0, -1).trim();
    }
    currentValue = currentValue.replace(/,(\s*})/, "$1");
    currentValue = currentValue + `,\n\t"expiry_gap":${futExpiryGapVal}` +",\n \t" + `"expiry_time":"monthly"  \n }`;
    }

    editor.setValue(currentValue);

    if(document.getElementById("dropdown1").value=="FUT"){
       document.getElementById("productType").innerHTML= `<b >Product <span class="text-muted">*</span></b>
        <div class="mt-2">
        <select id="futproductDropdown">
        <option selected hidden disabled>Select Product</option>
          <option value="INTRADAY">INTRADAY</option>
          <Option value="CARRYFORWARD">CARRYFORWARD</Option>
          <Option value="DELIVERY">DELIVERY</Option>
          <Option value="MARGIN">MARGIN</Option>
        </select>
        </div>`
    }

        let futproductDropdown=document.getElementById("futproductDropdown");
        futproductDropdown?.addEventListener("change",function(){
          console.log("okkk")

          let selectedValue = this.value;
          console.log(selectedValue)
          if (!selectedValue || !editor) return;

          //this will add or replace in code snippet
          let currentValue = editor.getValue();
          console.log(currentValue)
          if (/"product"\s*:\s*".*?"/.test(currentValue)) {
            currentValue = currentValue.replace(
              /("product"\s*:\s*").*?(")/,
              `$1${selectedValue}$2`
            );
          } 
            else {
            // Remove the last closing brace
            currentValue = currentValue.trim();
            if (currentValue.endsWith("}")) {
              currentValue = currentValue.slice(0, -1);
            }
            currentValue = currentValue.replace(/,\s*$/, "");

                // Append new script value
                currentValue+= `,\n \t"product":"${selectedValue}" \n}`;
            }
           
            editor.setValue(currentValue);
       
            let numberbox = document.getElementById("productOnselect");
            numberbox.style.display="block";
            console.log("okkk")
            numberbox.innerHTML = `
              <b class="mt-">Quantity <span class="text-muted">*</span></b>
              <div>
                <input type="number" id="quantityBox" class="mt-2" placeholder="Enter Quantity">
                <small id="quantityError" style="color:red; display:none;">Quantity must be greater than 0.</small>
              </div>`;

                let quantityNumber = document.getElementById("quantityBox");
                let quantityError = document.getElementById("quantityError");

            quantityNumber?.addEventListener("input", function () {
            //for error message
            if (quantityNumber.value <= 0) {
                quantityError.style.display = "block"; // just show error
                document.getElementById("quantityEnterShow").style.display="none";
                document.getElementById("target_value").style.display="none";
                document.getElementById("stoploss_value").style.display="none";
                document.getElementById("stoplossDropdownCtn").style.display="none";
                document.getElementById("targetDropdownCtn").style.display="none";
                document.getElementById("trailingDropdownCtn").style.display="none";
                document.getElementById("trailingtrigger_value").style.display="none";
                document.getElementById("trailingpoint_value").style.display="none";
                document.getElementById("trailinggap_value").style.display="none";
                
              } 
              
              //if valid value then show switches and switch's functioning
              else {
                quantityError.style.display = "none";  // hide error

              let quantityDiv= document.getElementById("quantityEnterShow");
              document.getElementById("futbuySell").appendChild(quantityDiv);
              document.getElementById("quantityEnterShow").style.display="block";
              document.getElementById("rolloverSwitch").style.display="block";

                
                        //buy sell button color switch
                          let buy=document.getElementsByClassName("buyBtn")[0];
                          let sell=document.getElementsByClassName("sellBtn")[0];
                        
                          buy.addEventListener("click",function(){
                            buy.style.background="green";
                            sell.style.background="";
                            let code = editor.getValue();
                              if (/"transaction_type"\s*:\s*".*?"/.test(code)) {
                                  code = code.replace(/("transaction_type"\s*:\s*").*?"/, `$1BUY"`);
                              } else {
                                  // If not present, you can optionally add it
                                  code = code.replace(/(\{)/, `$1\n  "transaction_type":"BUY",`);
                              }
                              editor.setValue(code);
                          });

                          sell.addEventListener("click",function(){
                            
                            sell.style.background="red";
                            buy.style.background="";
                            let code = editor.getValue();
                              if (/"transaction_type"\s*:\s*".*?"/.test(code)) {
                                  code = code.replace(/("transaction_type"\s*:\s*").*?"/, `$1SELL"`);
                              } else {
                                  // If not present, you can optionally add it
                                  code = code.replace(/(\{)/, `$1\n  "transaction_type":"SELL",`);
                              }
                              editor.setValue(code);
                          })
              }
      
            


    
            
    //exit on purpose switch toggle
                const exitOnPurposeSwitch = document.getElementById('flexSwitchCheck1');
                
                function toggleExitOnOpposite() {
                    let code = editor.getValue();
                    code = code.replace(
                        /("exit_on_opposite"\s*:\s*)(true|false)/,
                        `$1${exitOnPurposeSwitch.checked}`
                    );
                    
                    editor.setValue(code);
                }
                exitOnPurposeSwitch?.addEventListener('change', toggleExitOnOpposite);

                //target switch toggle
                const   targetSwitch = document.getElementById('flexSwitchCheck2');
                function toggleIsTgt() {
                    let code = editor.getValue();

                    // Toggle exit_on_opposite in the JSON string
                     code = code.replace(
                        /("is_tgt"\s*:\s*)(true|false)/,
                        `$1${targetSwitch.checked}`
                    );
                    editor.setValue(code);
                     if(!(targetSwitch.checked)){
                      document.getElementById("targetdropdown").selectedIndex=0;
                      document.getElementById("target_value").value="";
                    }

                }

                //onchange toggles the switch, call the function and also shows dropdown
                let dropdownofTarget=document.getElementById("targetDropdownCtn");
                document.getElementById("futSwitchshowCtn").appendChild(dropdownofTarget);

                
                function targerSwitchReflect(){
                  dropdownofTarget.style.display = targetSwitch.checked ? 'block' : 'none';
                  
                  if(dropdownofTarget.style.display==="block"){
                            document.getElementById("targetdropdown")?.addEventListener("change",function(){

                                         let selectedtargetValue = this.value;
                                            if (!selectedtargetValue || !editor) return;

                                            //this will add or replace in code snippet
                                            let currentValue = editor.getValue();
                                            if (/"tgt_type"\s*:\s*".*?"/.test(currentValue)) {
                                              currentValue = currentValue.replace(
                                                /("tgt_type"\s*:\s*").*?(")/,
                                                `$1${selectedtargetValue}$2`
                                              );
                                            } 
                                              else {
                                              // Remove the last closing brace
                                              currentValue = currentValue.trim();
                                              if (currentValue.endsWith("}")) {
                                                currentValue = currentValue.slice(0, -1);
                                              }
                                              currentValue = currentValue.replace(/,\s*$/, "");

                                                  // Append new script value
                                                  currentValue+= `,\n \t"tgt_type":"${selectedtargetValue}" \n}`;
                                              }
                                            
                                            editor.setValue(currentValue);

                              let targetswDiv= document.getElementById("target_value");
                              document.getElementById("futSwitchshowCtn").appendChild(targetswDiv);
                              document.getElementById("target_value").style.display="block";

                                           let targetValBox = document.getElementById("targetValbox");
                                           let targetErr = document.getElementById("targetError");


                                            targetValBox?.addEventListener("input", function () {
                                              let targetValue=this.value.trim();
                                              let currentValue=editor.getValue().trim();

                                                if(targetValue<0){
                                                  targetErr.style.display="block";
                                                }
                                                else{
                                                  targetErr.style.display="none";
                                                }

                                              if(!targetValue){
                                                currentValue = currentValue.replace(/,?\s*"tgt_value"\s*:\s*\d+\s*/g, "");
                                                // Also clean up trailing commas before }
                                                currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                editor.setValue(currentValue);
                                                return;
                                              }

                                              if(/\"tgt_value\"\s*:\s*\d*/.test(currentValue)){
                                                currentValue = currentValue.replace(
                                                /("tgt_value"\s*:\s*)\d*/,
                                                `$1${targetValue}`
                                                ); 
                                              }
                                              else{
                                                if (currentValue.endsWith("}")) {
                                                        currentValue = currentValue.slice(0, -1).trim();
                                                      }
                                                      currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                      currentValue = currentValue + `,\n\t"tgt_value":${targetValue}\n}`;
                                                }

                                              editor.setValue(currentValue);

                                                
                                            });
      
                                 
                                      });
                  }
                  else{
                    document.getElementById("target_value").style.display="none";
                    let code = editor.getValue();
                        code = code.replace(/,\s*"tgt_type"\s*:\s*".*?"/g, "");
                        code = code.replace(/,\s*"tgt_value"\s*:\s*[^,}]+/g, "");
                        editor.setValue(code);
                  }

                };
                targetSwitch.addEventListener("change",function(){
                  toggleIsTgt();
                  targerSwitchReflect();
                })

                const rolloverswitch = document.getElementById("flexSwitchCheck5");

  function toggleIsRollover() {
      let code = editor.getValue();

      // Toggle "is_rollover" in JSON
      code = code.replace(
          /("is_rollover"\s*:\s*)(true|false)/,
          `$1${rolloverswitch.checked}`
      );
      editor.setValue(code);

      if (!rolloverswitch.checked) {
          document.getElementById("rollovervalbox").value = "";
          document.getElementById("timeBox").value = "00:00:00";
      }
  }
  let rolloverCtn=document.getElementById("rollover_value");
    document.getElementById("futSwitchshowCtn").appendChild(rolloverCtn);

  function rolloverSwitchReflect() {
      rolloverCtn.style.display = rolloverswitch.checked ? "block" : "none";

    if (rolloverCtn.style.display === "block") {
        document.getElementById("rollovervalbox")?.addEventListener("input", function () {
            let rolloverswdiv = document.getElementById("rollover_time");
            document.getElementById("futSwitchshowCtn").appendChild(rolloverswdiv);
            rolloverswdiv.style.display = "block";

            // Create time input box dynamically
          

            // --- Handle rollover_gap ---
            let rolloverErr = document.getElementById("rolloverError");
            let rolloverValue = this.value.trim();
            let currentValue = editor.getValue().trim();

            if (rolloverValue < 0) {
                rolloverErr.style.display = "block";
            } else {
                rolloverErr.style.display = "none";
            }

            if (!rolloverValue) {
                currentValue = currentValue.replace(/,?\s*"rollover_gap"\s*:\s*\d+\s*/g, "");
                currentValue = currentValue.replace(/,\s*}/, "\n}");
                editor.setValue(currentValue);
                return;
            }

            if (/\"rollover_gap\"\s*:\s*\d*/.test(currentValue)) {
                currentValue = currentValue.replace(
                    /("rollover_gap"\s*:\s*)\d*/,
                    `$1${rolloverValue}`
                );
            } else {
                if (currentValue.endsWith("}")) {
                    currentValue = currentValue.slice(0, -1).trim();
                }
                currentValue = currentValue.replace(/,(\s*})/, "$1");
                currentValue = currentValue + `,\n\t"rollover_gap":${rolloverValue}\n}`;
            }
            editor.setValue(currentValue);

            // --- Handle rollover_time ---
            const timeBox = document.getElementById("timeBox");
            timeBox.addEventListener("change", function () {
                let timeValue = this.value.trim();
                let currentCode = editor.getValue().trim();

                if (!timeValue) {
                    // Remove if empty
                    currentCode = currentCode.replace(/,?\s*"rollover_time"\s*:\s*".*?"/g, "");
                    editor.setValue(currentCode);
                    return;
                }

                if (/\"rollover_time\"\s*:\s*".*?"/.test(currentCode)) {
                    currentCode = currentCode.replace(
                        /("rollover_time"\s*:\s*").*?(")/,
                        `$1${timeValue}$2`
                    );
                } else {
                    if (currentCode.endsWith("}")) {
                        currentCode = currentCode.slice(0, -1).trim();
                    }
                    currentCode = currentCode.replace(/,(\s*})/, "$1");
                    currentCode = currentCode + `,\n\t"rollover_time":"${timeValue}"\n}`;
                }

                editor.setValue(currentCode);
            });
        });
          }
           else {
              document.getElementById("target_value").style.display = "none";
              let code = editor.getValue();
              code = code.replace(/,\s*"rollover_gap"\s*:\s*\d+/g, "");
              code = code.replace(/,\s*"rollover_time"\s*:\s*".*?"/g, "");
              editor.setValue(code);
          }
}

rolloverswitch.addEventListener("change", function () {
    toggleIsRollover();
    rolloverSwitchReflect();
});



                //check the val true or false and shows box according

                //stoploss switch
                const   stoplossSwitch = document.getElementById('flexSwitchCheck3');
                function toggleIsSl() {
                    let code = editor.getValue();

                    // Toggle exit_on_opposite in the JSON string
                              code = code.replace(
                              /("is_sl"\s*:\s*)(true|false)/,
                              `$1${stoplossSwitch.checked}`
                              );
                          editor.setValue(code);
                          if(!(stoplossSwitch.checked)){
                            document.getElementById("stoplossdropdown").selectedIndex=0;
                            document.getElementById("stoploss_value").value="";
                          }
                }

                //onchange toggles the switch, call the function and also shows dropdown
                function stoplossSwitchReflect(){
                  let dropdownOfStoploss=document.getElementById("stoplossDropdownCtn");
                  document.getElementById("futSwitchshowCtn").appendChild(dropdownOfStoploss);
                  dropdownOfStoploss.style.display = stoplossSwitch.checked ? 'block' : 'none';

                  if(dropdownOfStoploss.style.display==="block"){
                            document.getElementById("stoplossdropdown")?.addEventListener("change",function(){

                                         let selectedstoplossValue = this.value;
                                            if (!selectedstoplossValue || !editor) return;

                                            //this will add or replace in code snippet
                                            let currentValue = editor.getValue();
                                            if (/"sl_type"\s*:\s*".*?"/.test(currentValue)) {
                                              currentValue = currentValue.replace(
                                                /("sl_type"\s*:\s*").*?(")/,
                                                `$1${selectedstoplossValue}$2`
                                              );
                                            } 
                                              else {
                                              // Remove the last closing brace
                                              currentValue = currentValue.trim();
                                              if (currentValue.endsWith("}")) {
                                                currentValue = currentValue.slice(0, -1);
                                              }
                                              currentValue = currentValue.replace(/,\s*$/, "");

                                                  // Append new script value
                                                  currentValue+= `,\n \t"sl_type":"${selectedstoplossValue}" \n}`;
                                              }
                                            
                                            editor.setValue(currentValue);


                              let slvalbox=document.getElementById("stoploss_value");
                              document.getElementById("futSwitchshowCtn").appendChild(slvalbox);              
                              document.getElementById("stoploss_value").style.display="block";
                                           let stoplossValbox = document.getElementById("stoplossValbox");
                                           let stoplossErr = document.getElementById("stoplossError");


                                            stoplossValbox?.addEventListener("input", function () {
                                              let stoplossValue=this.value.trim();
                                              let currentValue=editor.getValue().trim();

                                                if(stoplossValue<0){
                                                  stoplossErr.style.display="block";
                                                }
                                                else{
                                                  stoplossErr.style.display="none";
                                                }

                                              if(!stoplossValue){
                                                currentValue = currentValue.replace(/,?\s*"sl_value"\s*:\s*\d+\s*/g, "");
                                                // Also clean up trailing commas before }
                                                currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                editor.setValue(currentValue);
                                                return;
                                              }

                                              if(/\"sl_value\"\s*:\s*\d*/.test(currentValue)){
                                                currentValue = currentValue.replace(
                                                /("sl_value"\s*:\s*)\d*/,
                                                `$1${stoplossValue}`
                                                ); 
                                              }
                                              else{
                                                if (currentValue.endsWith("}")) {
                                                        currentValue = currentValue.slice(0, -1).trim();
                                                      }
                                                      currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                      currentValue = currentValue + `,\n\t"sl_value":${stoplossValue}\n}`;
                                                }

                                              editor.setValue(currentValue);

                                                
                                            });
      
                                 
                                      });
                  }
                  else{
                    document.getElementById("stoploss_value").style.display="none";
                    let code = editor.getValue();

                        code = code.replace(/,\s*"sl_type"\s*:\s*".*?"/g, "");
                        code = code.replace(/,\s*"sl_value"\s*:\s*[^,}]+/g, "");
                        editor.setValue(code);
                  }


                };

                stoplossSwitch.addEventListener("change",function(){
                  toggleIsSl();
                  stoplossSwitchReflect();
                  
                })

                //trailing switch
                const   trailingSwitch = document.getElementById('flexSwitchCheck4');
                function toggleIsTrailSet() {
                    let code = editor.getValue();
                      code = code.replace(
                      /("is_trail_set"\s*:\s*)(true|false)/,
                      `$1${trailingSwitch.checked}`
                      );

                    editor.setValue(code);
                    if(!(trailingSwitch.checked)){
                    document.getElementById("trailingdropdown").selectedIndex=0;
                    document.getElementById("trailingtrigger_value").value="";
                    document.getElementById("trailinggap_value").value="";
                    document.getElementById("trailingpoint_value").value="";
                    }
                }
                function trailswitchReflect(){
                  let dropdownOfTrailing=document.getElementById("trailingDropdownCtn");
                  document.getElementById("futSwitchshowCtn").appendChild(dropdownOfTrailing)
                  dropdownOfTrailing.style.display = trailingSwitch.checked ? 'block' : 'none';

                      if(dropdownOfTrailing.style.display==="block"){

                                document.getElementById("trailingdropdown")?.addEventListener("change",function(){

                                            let selectedtrailingValue = this.value;
                                                if (!selectedtrailingValue || !editor) return;

                                                //this will add or replace in code snippet
                                                let currentValue = editor.getValue();
                                                if (/"trail_type"\s*:\s*".*?"/.test(currentValue)) {
                                                  currentValue = currentValue.replace(
                                                    /("trail_type"\s*:\s*").*?(")/,
                                                    `$1${selectedtrailingValue}$2`
                                                  );
                                                } 
                                                  else {
                                                  // Remove the last closing brace
                                                  currentValue = currentValue.trim();
                                                  if (currentValue.endsWith("}")) {
                                                    currentValue = currentValue.slice(0, -1);
                                                  }
                                                  currentValue = currentValue.replace(/,\s*$/, "");

                                                      // Append new script value
                                                      currentValue+= `,\n \t"trail_type":"${selectedtrailingValue}" \n}`;
                                                  }
                                                
                                                editor.setValue(currentValue);


                                              let trailtriggerval=document.getElementById("trailingtrigger_value");  
                                              document.getElementById("futSwitchshowCtn").appendChild(trailtriggerval)    
                                              document.getElementById("trailingtrigger_value").style.display="block";
                                              let  trailtriggerValbox= document.getElementById("trailtriggerValbox");
                                              let trailTriggerError = document.getElementById("trailTriggerError");


                                                trailtriggerValbox?.addEventListener("input", function () {

                                                  let trailTriggerValue=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailTriggerValue<0){
                                                      
                                                  let trailgap=document.getElementById("trailinggap_value");
                                                  document.getElementById("futSwitchshowCtn").appendChild(trailgap);
                                                      trailTriggerError.style.display="block";
                                                      document.getElementById("trailinggap_value").style.display="none";

                                                    }
                                                    else{
                                                      
                                                  let trailgap=document.getElementById("trailinggap_value");
                                                  document.getElementById("futSwitchshowCtn").appendChild(trailgap);
                                                      trailTriggerError.style.display="none";
                                                      document.getElementById("trailinggap_value").style.display="block";
                                                    }

                                                  if(!trailTriggerValue){
                                                    currentValue = currentValue.replace(/,?\s*"trail_trigger"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_trigger\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_trigger"\s*:\s*)\d*/,
                                                    `$1${trailTriggerValue}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_trigger":${trailTriggerValue}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                 
                                                 
                                                  //trail gap number box show
                                                document.getElementById("trailGapValbox")?.addEventListener("input",function(){
                                                  let trailgapError=document.getElementById("trailGapError");
                                                  let trailGapValue=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailGapValue<0){
                                                      trailgapError.style.display="block";
                                                      
                                                  let trailpoint=document.getElementById("trailingpoint_value");
                                                  document.getElementById("futSwitchshowCtn").appendChild(trailpoint);
                                                      document.getElementById("trailingpoint_value").style.display="none";

                                                    }
                                                    else{
                                                      trailgapError.style.display="none";
                                                      
                                                  let trailpoint=document.getElementById("trailingpoint_value");
                                                  document.getElementById("futSwitchshowCtn").appendChild(trailpoint);
                                                      document.getElementById("trailingpoint_value").style.display="block";
                                                    }

                                                  if(!trailGapValue){
                                                    currentValue = currentValue.replace(/,?\s*"trail_gap"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_gap\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_gap"\s*:\s*)\d*/,
                                                    `$1${trailGapValue}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_gap":${trailGapValue}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                  })   

                                                  //document.getElementById("trailingpoint_value").style.display="block"

                                                  //trail point input box
                                                  document.getElementById("trailPointValbox")?.addEventListener("input",function(){
                                                  let trailpointError=document.getElementById("trailPointError");
                                                  let trailpointVal=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailpointVal<0){

                                                      trailpointError.style.display="block";

                                                    }
                                                    else{
                                                      trailpointError.style.display="none";
                                                      }

                                                  if(!trailpointVal){
                                                    currentValue = currentValue.replace(/,?\s*"trail_point"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_point\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_point"\s*:\s*)\d*/,
                                                    `$1${trailpointVal}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_point":${trailpointVal}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                  })   


                                                  
                                                });
                                        });


                      }
                      else{
                        document.getElementById("trailingtrigger_value").style.display="none";
                        document.getElementById("trailinggap_value").style.display="none";
                        document.getElementById("trailingpoint_value").style.display="none";
                        let code = editor.getValue();

                            code = code.replace(/,\s*"trail_type"\s*:\s*".*?"/g, "");
                            code = code.replace(/,\s*"trail_trigger"\s*:\s*[^,}]+/g, "");
                            code = code.replace(/,\s*"trail_gap"\s*:\s*[^,}]+/g, "");
                            code = code.replace(/,\s*"trail_point"\s*:\s*[^,}]+/g, "");

                            editor.setValue(code);
                      }
                }
                trailingSwitch.addEventListener("change",function(){
                  toggleIsTrailSet();
                  trailswitchReflect();
                })
              
            let quantityValue = this.value.trim();
            if (!quantityValue) {
              currentValue = currentValue.replace(/,?\s*"quantity"\s*:\s*\d+\s*/g, "");
              // Also clean up trailing commas before }
              currentValue = currentValue.replace(/,\s*}/, "\n}");
              editor.setValue(currentValue);
              return;
            }

            if (/\"quantity\"\s*:\s*\d*/.test(currentValue)) {
              // If already present => replace value only
              currentValue = currentValue.replace(
                /("quantity"\s*:\s*)\d*/,
                `$1${quantityValue}`
              );
            } 
            else {
              // If not present then add it at the end
              if (currentValue.endsWith("}")) {
                currentValue = currentValue.slice(0, -1).trim();
              }
              currentValue = currentValue.replace(/,(\s*})/, "$1");
              currentValue = currentValue + `,\n\t"quantity":${quantityValue}\n}`;
            }

           

            document.querySelectorAll('input[type="checkbox"]').forEach(toggleBtn => {
              toggleBtn.checked = false; // turn off all switches
              document.getElementById("targetdropdown").selectedIndex=0;
              document.getElementById("stoplossdropdown").selectedIndex=0;
              document.getElementById("trailingdropdown").selectedIndex=0;
              document.getElementById("target_value").value="";
              document.getElementById("stoploss_value").value="";
              document.getElementById("trailingtrigger_value").value="";
              document.getElementById("trailinggap_value").value="";
              document.getElementById("trailingpoint_value").value="";
              document.getElementById("rollover_value").value="";
              document.getElementById("rollover_time").value="00:00"


               targerSwitchReflect();
               stoplossSwitchReflect();
               trailswitchReflect();

            });
              

            // Remove related switch values from JSON
            currentValue = currentValue
              .replace(/"exit_on_opposite"\s*:\s*(true|false),?/g, '"exit_on_opposite": false,')
              .replace(/"is_tgt"\s*:\s*(true|false),?/g, '"is_tgt": false,')
              .replace(/"tgt_type"\s*:\s*".*?",?/g, "")
              .replace(/"tgt_value"\s*:\s*\d*/, "")
              .replace(/"is_sl"\s*:\s*(true|false),?/g, '"is_sl": false,')
              .replace(/"sl_type"\s*:\s*".*?",?/g, "")
              .replace(/"sl_value"\s*:\s*\d*/, "")
              .replace(/"is_trail_set"\s*:\s*(true|false),?/g, '"is_trail_set": false,')
              .replace(/"trail_type"\s*:\s*".*?",?/g, "")
              .replace(/"trail_trigger"\s*:\s*\d*/, "")
              .replace(/"trail_gap"\s*:\s*\d*/, "")
              .replace(/"trail_point"\s*:\s*\d*/, "");
                        
               editor.setValue(currentValue);
            

    

          
          });
        });
    });
        
   
}                   
 
function CEselection(){
  document.getElementById("productType").style.display="none";
  document.getElementsByClassName("expiryGap")[0].style.display="none"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJmcmNoX2lkIjoxLCJlbWFpbCI6ImRldjMuYWxnb2RlbHRhQGdtYWlsLmNvbSIsIm1vYmlsZV9ubyI6IjkzMTMxODM4NDciLCJjdXN0X2lkIjoiNzM1NTQ3IiwiZW52IjoibWFpbiIsInVzZXJfdHlwZSI6InVzZXIiLCJpYXQiOjE3NTYxNDE3NDMsImV4cCI6MTc1NjIyODE0M30.cj21v3sS2AGM8Unulg0mL3C3rqWF7FzLsEIjrb9LHgQ";
    const searchInput = document.getElementById('search');
    const dropdown = document.getElementById('dropdown');

    document.addEventListener('click', (e) => {
      // Check if click is outside the input and dropdown
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });

    // Simple debounce function
    function debounce(func, delay) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    }

    // Fetch API suggestions
    async function fetchSuggestions(query) {
      if (!query) {
        dropdown.style.display = 'none';
        dropdown.innerHTML = '';
        return;
      }

      let scriptType = document.getElementById("dropdown1")?.value;
      let optionSelection=document.getElementById("atmdropdown")?.value;
      try {
        const res = await fetch("https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            option_selection:optionSelection,
            script: query,
            type: scriptType
          })
        });

        const data = await res.json();
        const suggestions = data.data;


        dropdown.innerHTML = suggestions.map(item => `<li>${item.script} (${item.exchange})</li>`).join('');
        dropdown.style.display = suggestions.length ? 'block' : 'none';

      }
      catch (err) {
        console.error(err);
      }
    }




    // Add click selection
    dropdown?.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        let selectedText = e.target.textContent;
        searchInput.value = selectedText;
        // remove everything after "("
        if (selectedText.includes("(")) {
          selectedText = selectedText.split("(")[0];
        }

        dropdown.style.display = 'none';
        if(dropdown1.value === "CE" || dropdown1.value === "PE"){
        document.getElementsByClassName("CEpremium")[0].style.display = "block";}


      //document.getElementById("EQOption2")?.innerHTML="";
      document.getElementById("showNumberBox").innerHTML="";
      let currentValue = editor.getValue().trim();

    // If "script" already exists → replace only
        if (/"script"\s*:\s*".*?"/.test(currentValue)) {
          currentValue = currentValue.replace(
            /("script"\s*:\s*").*?(")[\s\S]*$/,
            `$1${selectedText}$2\n}`
          );


        } 

        else {
          // Remove last } if present
          if (currentValue.endsWith("}")) {
            currentValue = currentValue.slice(0, -1).trim();
          }

          // Remove trailing comma if any
          currentValue = currentValue.replace(/,\s*$/, "");

          // Append cleanly
          currentValue = currentValue + `,\n\t"script":"${selectedText}"\n}`;
        }

        editor.setValue(currentValue);
      }
    });

    searchInput.addEventListener('input', debounce(e => {
      fetchSuggestions(e.target.value);
    }, 300));

    // CEscriptbox.addEventListener("change",function(){
    //   console.log("okk")
    //   document.getElementsByClassName("CEpremium")[0].style.display="block";
  //   CEscriptbox.addEventListener("change", function() {
  //     console.log(CEscriptbox.value)
  // // only show if a valid suggestion was chosen
  // if ([...dropdown.querySelectorAll("li")].some(li => li.textContent.startsWith(CEscriptbox.value))) {
  //   console.log("if")
  //   document.getElementsByClassName("CEpremium")[0].style.display = "block";
  // } else {
  //   console.log("else")
  //   document.getElementsByClassName("CEpremium")[0].style.display = "none"; // hide on random text
  // }

      document.getElementById("premiumbox")?.addEventListener("input",function(){
        document.getElementsByClassName("maxvariation")[0].style.display="block";
        let premiumnumber=document.getElementById("premiumbox");
        let premiumerror=document.getElementById("premiumvalError");
        if(premiumnumber.value<0){
          premiumerror.style.display="block";
        }
        else{
          premiumerror.style.display="none"
        }
        let currentValue=editor.getValue();
        let premiumVal=document.getElementById("premiumbox")?.value
        if(!premiumVal){
       currentValue = currentValue.replace(/,?\s*"premium_value"\s*:\s*\d+\s*/g, "");
       // Also clean up trailing commas before }
     currentValue = currentValue.replace(/,\s*}/, "\n}");
     editor.setValue(currentValue);
     document.getElementsByClassName("timeline")[0].style.display="none";
      return;
    }
    if(/\"premium_value\"\s*:\s*\d*/.test(currentValue)){
    currentValue = currentValue.replace(
     /("premium_value"\s*:\s*)\d*/,
    `$1${premiumVal}`
     ); 
    }
    else{
    if (currentValue.endsWith("}")) {
    currentValue = currentValue.slice(0, -1).trim();
    }
    currentValue = currentValue.replace(/,(\s*})/, "$1");
    currentValue = currentValue + `,\n\t"premium_value":${premiumVal}` +",\n \t" + `"max_variation":10  \n }` ;
    }

    editor.setValue(currentValue);
        


        
        document.getElementsByClassName("CEpremium")[0].style.display="block";
        document.getElementById("CEcontentreuse").style.display="block";
        document.getElementById("CEcontentreuse").style.display="flex";
        let expirygap=document.getElementsByClassName("expiryGap")[0];
        document.getElementById("CEcontentreuse")?.appendChild(expirygap);
        expirygap.style.display="block";

        document.getElementById("maxvariationbox")?.addEventListener("input",function(){
          console.log("enter")
         const maxvariationerr = document.getElementById("maxvariationError");
          if (this.value < 10) {
            maxvariationerr.style.display = "block";
          } else {
            maxvariationerr.style.display = "none";
          }

          let maxVariationVal=document.getElementById("maxvariationbox")?.value
          let currentValue=editor.getValue();
        if(!maxVariationVal){

       currentValue = currentValue.replace(/,?\s*"max_variation"\s*:\s*\d+\s*/g, "");
       // Also clean up trailing commas before }
        currentValue = currentValue.replace(/,\s*}/, "\n}");
        editor.setValue(currentValue);
        document.getElementsByClassName("timeline")[0].style.display="none";
          return;
        }
        if(/\"max_variation\"\s*:\s*\d*/.test(currentValue)){
        currentValue = currentValue.replace(
        /("max_variation"\s*:\s*)\d*/,
        `$1${maxVariationVal}`
        ); 
        }
        else{
        if (currentValue.endsWith("}")) {
        currentValue = currentValue.slice(0, -1).trim();
        }
        currentValue = currentValue.replace(/,(\s*})/, "$1");
        currentValue = currentValue + `,\n\t"max_variation":${maxVariationVal}` +"\n  }" ;
        }

        editor.setValue(currentValue);

        });

        let expiryGapVal=document.getElementById("futExpiryGap");
        
        expiryGapVal.addEventListener("input",function(){

          if(!expiryGapVal.value){
          currentValue = currentValue.replace(/,?\s*"expiry_gap"\s*:\s*\d+\s*/g, "");
       // Also clean up trailing commas before }
        currentValue = currentValue.replace(/,\s*}/, "\n}");
        editor.setValue(currentValue);
        document.getElementsByClassName("timeline")[0].style.display="none";
          return;
        }
        if(/\"expiry_gap\"\s*:\s*\d*/.test(currentValue)){
        currentValue = currentValue.replace(
        /("expiry_gap"\s*:\s*)\d*/,
        `$1${expiryGapVal.value}`
        ); 
        }
        else{
        if (currentValue.endsWith("}")) {
        currentValue = currentValue.slice(0, -1).trim();
        }
        currentValue = currentValue.replace(/,(\s*})/, "$1");
        currentValue = currentValue + `,\n\t"expiry_gap":${expiryGapVal.value}` +"\n }" ;
        }

        editor.setValue(currentValue);
 
          //document.getElementsByClassName("timeline")[0].style.display="block";
          let expirytime=document.getElementsByClassName("timeline")[0];
        document.getElementById("CEcontentreuse")?.appendChild(expirytime);
        expirytime.style.display="block";
        document.getElementById("timelineDropdown").disabled=false;
          document.getElementById("timelineDropdown")?.addEventListener("change",function(){
                let currentValue = editor.getValue();
                let selectedValue = this.value;
                 if (!selectedValue || !editor) return;


              if (/"expiry_type"\s*:\s*".*?"/.test(currentValue)) {
                currentValue = currentValue.replace(
                  /("expiry_type"\s*:\s*").*?(")/,
                  `$1${selectedValue}$2`
                );
              } 
                else {
                // Remove the last closing brace
                currentValue = currentValue.trim();
                if (currentValue.endsWith("}")) {
                  currentValue = currentValue.slice(0, -1);
                }
                currentValue = currentValue.replace(/,\s*$/, "");

                    // Append new script value
                    currentValue+= `,\n \t"expiry_type":"${selectedValue}" \n}`;
                }
              
                editor.setValue(currentValue);
          

              if(document.getElementById("dropdown1").value=="CE" ||document.getElementById("dropdown1").value=="PE" ){
               // document.getElementById("CEdropdown").style.display="block"
              // if (!document.getElementById("CEproductDropdown")) { // prevent duplicate dropdowns
              //   const productHTML = `
              //     <div id="CEdropdown"><b>Product <span class="text-muted">*</span></b>
              //       <div class="mt-2">
              //         <select id="CEproductDropdown">
              //           <option selected hidden disabled>Select Product</option>
              //           <option value="INTRADAY">INTRADAY</option>
              //           <option value="CARRYFORWARD">CARRYFORWARD</option>
              //           <option value="DELIVERY">DELIVERY</option>
              //           <option value="MARGIN">MARGIN</option>
              //         </select>
              //       </div>
              //     </div>`;
              //   document.getElementById("CEcontentreuse")
              //     .insertAdjacentHTML("beforeend", productHTML);
              // } 
              let CEdropdown=document.getElementById("cedropdown");
                document.getElementById("CEcontentreuse").appendChild(CEdropdown)
              CEdropdown.style.display="block"
            
              CEdropdown.innerHTML=`<div id="CEdropdown"><b>Product <span class="text-muted">*</span></b>
                     <div class="mt-2">
                      <select id="CEproductDropdown">
                        <option selected hidden disabled>Select Product</option>
                         <option value="INTRADAY">INTRADAY</option>
                         <option value="CARRYFORWARD">CARRYFORWARD</option>
                         <option value="DELIVERY">DELIVERY</option>
                         <option value="MARGIN">MARGIN</option>
                       </select>
                     </div>
                   </div>`

            }
              
              document.getElementById("CEproductDropdown")?.addEventListener("change",function(){
                let currentValue = editor.getValue();
                let selectedValue = this.value;
          
                if (!selectedValue || !editor) return;

                if (/"product"\s*:\s*".*?"/.test(currentValue)) {
                  currentValue = currentValue.replace(
                    /("product"\s*:\s*").*?(")/,
                    `$1${selectedValue}$2`
                  );
                } 
                  else {
                  // Remove the last closing brace
                  currentValue = currentValue.trim();
                  if (currentValue.endsWith("}")) {
                    currentValue = currentValue.slice(0, -1);
                  }
                  currentValue = currentValue.replace(/,\s*$/, "");

                      // Append new script value
                      currentValue+= `,\n \t"product":"${selectedValue}" \n}`;
                  }
                
                  editor.setValue(currentValue);

                  let numberbox = document.getElementById("productOnselect");
                  document.getElementById("CEcontentreuse").appendChild(numberbox);
                    numberbox.style.display="block";
                    numberbox.innerHTML = `
                      <b class="mt-">Quantity <span class="text-muted">*</span></b>
                      <div>
                        <input type="number" id="quantityBox" class="mt-2" placeholder="Enter Quantity">
                        <small id="quantityError" style="color:red; display:none;">Quantity must be greater than 0.</small>
                      </div>`;

                        let quantityNumber = document.getElementById("quantityBox");
                        let quantityError = document.getElementById("quantityError");

                    quantityNumber?.addEventListener("input", function () {
                    //for error message
                    if (quantityNumber.value <= 0) {
                        quantityError.style.display = "block"; // just show error
                        document.getElementById("quantityEnterShow").style.display="none";
                        document.getElementById("target_value").style.display="none";
                        document.getElementById("stoploss_value").style.display="none";
                        document.getElementById("stoplossDropdownCtn").style.display="none";
                        document.getElementById("targetDropdownCtn").style.display="none";
                        document.getElementById("trailingDropdownCtn").style.display="none";
                        document.getElementById("trailingtrigger_value").style.display="none";
                        document.getElementById("trailingpoint_value").style.display="none";
                        document.getElementById("trailinggap_value").style.display="none";
                        
                      } 
                      
                      //if valid value then show switches and switch's functioning
                      else {
                        quantityError.style.display = "none";  // hide error

                      let quantityDiv= document.getElementById("quantityEnterShow");
                      document.getElementById("CEcontentreuse").appendChild(quantityDiv);
                      document.getElementById("quantityEnterShow").style.display="block";
                      document.getElementById("rolloverSwitch").style.display="block";

                        
                        //buy sell button color switch
                          let buy=document.getElementsByClassName("buyBtn")[0];
                          let sell=document.getElementsByClassName("sellBtn")[0];
                        
                          buy.addEventListener("click",function(){
                            buy.style.background="green";
                            sell.style.background="";
                            let code = editor.getValue();
                              if (/"transaction_type"\s*:\s*".*?"/.test(code)) {
                                  code = code.replace(/("transaction_type"\s*:\s*").*?"/, `$1BUY"`);
                              } else {
                                  // If not present, you can optionally add it
                                  code = code.replace(/(\{)/, `$1\n  "transaction_type":"BUY",`);
                              }
                              editor.setValue(code);
                          });

                          sell.addEventListener("click",function(){
                            
                            sell.style.background="red";
                            buy.style.background="";
                            let code = editor.getValue();
                              if (/"transaction_type"\s*:\s*".*?"/.test(code)) {
                                  code = code.replace(/("transaction_type"\s*:\s*").*?"/, `$1SELL"`);
                              } else {
                                  // If not present, you can optionally add it
                                  code = code.replace(/(\{)/, `$1\n  "transaction_type":"SELL",`);
                              }
                              editor.setValue(code);
                          })
              }
      

              //exit on purpose switch toggle
                const exitOnPurposeSwitch = document.getElementById('flexSwitchCheck1');
                
                function toggleExitOnOpposite() {
                    let code = editor.getValue();
                    code = code.replace(
                        /("exit_on_opposite"\s*:\s*)(true|false)/,
                        `$1${exitOnPurposeSwitch.checked}`
                    );
                    
                    editor.setValue(code);
                }
                exitOnPurposeSwitch?.addEventListener('change', toggleExitOnOpposite);

                //target switch toggle
                const   targetSwitch = document.getElementById('flexSwitchCheck2');
                function toggleIsTgt() {
                    let code = editor.getValue();

                    // Toggle exit_on_opposite in the JSON string
                     code = code.replace(
                        /("is_tgt"\s*:\s*)(true|false)/,
                        `$1${targetSwitch.checked}`
                    );
                    editor.setValue(code);
                     if(!(targetSwitch.checked)){
                      document.getElementById("targetdropdown").selectedIndex=0;
                      document.getElementById("target_value").value="";
                    }

                }

                //onchange toggles the switch, call the function and also shows dropdown
                let dropdownofTarget=document.getElementById("targetDropdownCtn");
                document.getElementById("ceSwitchCtn").appendChild(dropdownofTarget);

                
                function targerSwitchReflect(){
                  dropdownofTarget.style.display = targetSwitch.checked ? 'block' : 'none';
                  
                  if(dropdownofTarget.style.display==="block"){
                            document.getElementById("targetdropdown")?.addEventListener("change",function(){

                                         let selectedtargetValue = this.value;
                                            if (!selectedtargetValue || !editor) return;

                                            //this will add or replace in code snippet
                                            let currentValue = editor.getValue();
                                            if (/"tgt_type"\s*:\s*".*?"/.test(currentValue)) {
                                              currentValue = currentValue.replace(
                                                /("tgt_type"\s*:\s*").*?(")/,
                                                `$1${selectedtargetValue}$2`
                                              );
                                            } 
                                              else {
                                              // Remove the last closing brace
                                              currentValue = currentValue.trim();
                                              if (currentValue.endsWith("}")) {
                                                currentValue = currentValue.slice(0, -1);
                                              }
                                              currentValue = currentValue.replace(/,\s*$/, "");

                                                  // Append new script value
                                                  currentValue+= `,\n \t"tgt_type":"${selectedtargetValue}" \n}`;
                                              }
                                            
                                            editor.setValue(currentValue);

                              let targetswDiv= document.getElementById("target_value");
                              document.getElementById("ceSwitchCtn").appendChild(targetswDiv);
                              document.getElementById("target_value").style.display="block";

                                           let targetValBox = document.getElementById("targetValbox");
                                           let targetErr = document.getElementById("targetError");


                                            targetValBox?.addEventListener("input", function () {
                                              let targetValue=this.value.trim();
                                              let currentValue=editor.getValue().trim();

                                                if(targetValue<0){
                                                  targetErr.style.display="block";
                                                }
                                                else{
                                                  targetErr.style.display="none";
                                                }

                                              if(!targetValue){
                                                currentValue = currentValue.replace(/,?\s*"tgt_value"\s*:\s*\d+\s*/g, "");
                                                // Also clean up trailing commas before }
                                                currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                editor.setValue(currentValue);
                                                return;
                                              }

                                              if(/\"tgt_value\"\s*:\s*\d*/.test(currentValue)){
                                                currentValue = currentValue.replace(
                                                /("tgt_value"\s*:\s*)\d*/,
                                                `$1${targetValue}`
                                                ); 
                                              }
                                              else{
                                                if (currentValue.endsWith("}")) {
                                                        currentValue = currentValue.slice(0, -1).trim();
                                                      }
                                                      currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                      currentValue = currentValue + `,\n\t"tgt_value":${targetValue}\n}`;
                                                }

                                              editor.setValue(currentValue);

                                                
                                            });
      
                                 
                                      });
                  }
                  else{
                    document.getElementById("target_value").style.display="none";
                    let code = editor.getValue();
                        code = code.replace(/,\s*"tgt_type"\s*:\s*".*?"/g, "");
                        code = code.replace(/,\s*"tgt_value"\s*:\s*[^,}]+/g, "");
                        editor.setValue(code);
                  }

                };
                targetSwitch.addEventListener("change",function(){
                  toggleIsTgt();
                  targerSwitchReflect();
                })

                const rolloverswitch = document.getElementById("flexSwitchCheck5");

function toggleIsRollover() {
    let code = editor.getValue();

    // Toggle "is_rollover" in JSON
    code = code.replace(
        /("is_rollover"\s*:\s*)(true|false)/,
        `$1${rolloverswitch.checked}`
    );
    editor.setValue(code);

    if (!rolloverswitch.checked) {
        document.getElementById("rollovervalbox").value = "";
        document.getElementById("timeBox").value = "00:00:00";
    }
}
let rolloverCtn=document.getElementById("rollover_value");
  document.getElementById("ceSwitchCtn").appendChild(rolloverCtn);

function rolloverSwitchReflect() {
    rolloverCtn.style.display = rolloverswitch.checked ? "block" : "none";

    if (rolloverCtn.style.display === "block") {
        document.getElementById("rollovervalbox")?.addEventListener("input", function () {
            let rolloverswdiv = document.getElementById("rollover_time");
            document.getElementById("ceSwitchCtn").appendChild(rolloverswdiv);
            rolloverswdiv.style.display = "block";

            // Create time input box dynamically
          

            // --- Handle rollover_gap ---
            let rolloverErr = document.getElementById("rolloverError");
            let rolloverValue = this.value.trim();
            let currentValue = editor.getValue().trim();

            if (rolloverValue < 0) {
                rolloverErr.style.display = "block";
            } else {
                rolloverErr.style.display = "none";
            }

            if (!rolloverValue) {
                currentValue = currentValue.replace(/,?\s*"rollover_gap"\s*:\s*\d+\s*/g, "");
                currentValue = currentValue.replace(/,\s*}/, "\n}");
                editor.setValue(currentValue);
                return;
            }

            if (/\"rollover_gap\"\s*:\s*\d*/.test(currentValue)) {
                currentValue = currentValue.replace(
                    /("rollover_gap"\s*:\s*)\d*/,
                    `$1${rolloverValue}`
                );
            } else {
                if (currentValue.endsWith("}")) {
                    currentValue = currentValue.slice(0, -1).trim();
                }
                currentValue = currentValue.replace(/,(\s*})/, "$1");
                currentValue = currentValue + `,\n\t"rollover_gap":${rolloverValue}\n}`;
            }
            editor.setValue(currentValue);

            // --- Handle rollover_time ---
            const timeBox = document.getElementById("timeBox");
            timeBox.addEventListener("change", function () {
                let timeValue = this.value.trim();
                let currentCode = editor.getValue().trim();

                if (!timeValue) {
                    // Remove if empty
                    currentCode = currentCode.replace(/,?\s*"rollover_time"\s*:\s*".*?"/g, "");
                    editor.setValue(currentCode);
                    return;
                }

                if (/\"rollover_time\"\s*:\s*".*?"/.test(currentCode)) {
                    currentCode = currentCode.replace(
                        /("rollover_time"\s*:\s*").*?(")/,
                        `$1${timeValue}$2`
                    );
                } else {
                    if (currentCode.endsWith("}")) {
                        currentCode = currentCode.slice(0, -1).trim();
                    }
                    currentCode = currentCode.replace(/,(\s*})/, "$1");
                    currentCode = currentCode + `,\n\t"rollover_time":"${timeValue}"\n}`;
                }

                editor.setValue(currentCode);
            });
        });
          }
           else {
              document.getElementById("target_value").style.display = "none";
              let code = editor.getValue();
              code = code.replace(/,\s*"rollover_gap"\s*:\s*\d+/g, "");
              code = code.replace(/,\s*"rollover_time"\s*:\s*".*?"/g, "");
              editor.setValue(code);
          }
}

rolloverswitch.addEventListener("change", function () {
    toggleIsRollover();
    rolloverSwitchReflect();
});



                //check the val true or false and shows box according

                //stoploss switch
                const   stoplossSwitch = document.getElementById('flexSwitchCheck3');
                function toggleIsSl() {
                    let code = editor.getValue();

                    // Toggle exit_on_opposite in the JSON string
                              code = code.replace(
                              /("is_sl"\s*:\s*)(true|false)/,
                              `$1${stoplossSwitch.checked}`
                              );
                          editor.setValue(code);
                          if(!(stoplossSwitch.checked)){
                            document.getElementById("stoplossdropdown").selectedIndex=0;
                            document.getElementById("stoploss_value").value="";
                          }
                }

                //onchange toggles the switch, call the function and also shows dropdown
                function stoplossSwitchReflect(){
                  let dropdownOfStoploss=document.getElementById("stoplossDropdownCtn");
                  document.getElementById("ceSwitchCtn").appendChild(dropdownOfStoploss);
                  dropdownOfStoploss.style.display = stoplossSwitch.checked ? 'block' : 'none';

                  if(dropdownOfStoploss.style.display==="block"){
                            document.getElementById("stoplossdropdown")?.addEventListener("change",function(){

                                         let selectedstoplossValue = this.value;
                                            if (!selectedstoplossValue || !editor) return;

                                            //this will add or replace in code snippet
                                            let currentValue = editor.getValue();
                                            if (/"sl_type"\s*:\s*".*?"/.test(currentValue)) {
                                              currentValue = currentValue.replace(
                                                /("sl_type"\s*:\s*").*?(")/,
                                                `$1${selectedstoplossValue}$2`
                                              );
                                            } 
                                              else {
                                              // Remove the last closing brace
                                              currentValue = currentValue.trim();
                                              if (currentValue.endsWith("}")) {
                                                currentValue = currentValue.slice(0, -1);
                                              }
                                              currentValue = currentValue.replace(/,\s*$/, "");

                                                  // Append new script value
                                                  currentValue+= `,\n \t"sl_type":"${selectedstoplossValue}" \n}`;
                                              }
                                            
                                            editor.setValue(currentValue);


                              let slvalbox=document.getElementById("stoploss_value");
                              document.getElementById("ceSwitchCtn").appendChild(slvalbox);              
                              document.getElementById("stoploss_value").style.display="block";
                                           let stoplossValbox = document.getElementById("stoplossValbox");
                                           let stoplossErr = document.getElementById("stoplossError");


                                            stoplossValbox?.addEventListener("input", function () {
                                              let stoplossValue=this.value.trim();
                                              let currentValue=editor.getValue().trim();

                                                if(stoplossValue<0){
                                                  stoplossErr.style.display="block";
                                                }
                                                else{
                                                  stoplossErr.style.display="none";
                                                }

                                              if(!stoplossValue){
                                                currentValue = currentValue.replace(/,?\s*"sl_value"\s*:\s*\d+\s*/g, "");
                                                // Also clean up trailing commas before }
                                                currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                editor.setValue(currentValue);
                                                return;
                                              }

                                              if(/\"sl_value\"\s*:\s*\d*/.test(currentValue)){
                                                currentValue = currentValue.replace(
                                                /("sl_value"\s*:\s*)\d*/,
                                                `$1${stoplossValue}`
                                                ); 
                                              }
                                              else{
                                                if (currentValue.endsWith("}")) {
                                                        currentValue = currentValue.slice(0, -1).trim();
                                                      }
                                                      currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                      currentValue = currentValue + `,\n\t"sl_value":${stoplossValue}\n}`;
                                                }

                                              editor.setValue(currentValue);

                                                
                                            });
      
                                 
                                      });
                  }
                  else{
                    document.getElementById("stoploss_value").style.display="none";
                    let code = editor.getValue();

                        code = code.replace(/,\s*"sl_type"\s*:\s*".*?"/g, "");
                        code = code.replace(/,\s*"sl_value"\s*:\s*[^,}]+/g, "");
                        editor.setValue(code);
                  }


                };

                stoplossSwitch.addEventListener("change",function(){
                  toggleIsSl();
                  stoplossSwitchReflect();
                  
                })

                //trailing switch
                const   trailingSwitch = document.getElementById('flexSwitchCheck4');
                function toggleIsTrailSet() {
                    let code = editor.getValue();
                      code = code.replace(
                      /("is_trail_set"\s*:\s*)(true|false)/,
                      `$1${trailingSwitch.checked}`
                      );

                    editor.setValue(code);
                    if(!(trailingSwitch.checked)){
                    document.getElementById("trailingdropdown").selectedIndex=0;
                    document.getElementById("trailingtrigger_value").value="";
                    document.getElementById("trailinggap_value").value="";
                    document.getElementById("trailingpoint_value").value="";
                    }
                }
                function trailswitchReflect(){
                  let dropdownOfTrailing=document.getElementById("trailingDropdownCtn");
                  document.getElementById("ceSwitchCtn").appendChild(dropdownOfTrailing)
                  dropdownOfTrailing.style.display = trailingSwitch.checked ? 'block' : 'none';

                      if(dropdownOfTrailing.style.display==="block"){

                                document.getElementById("trailingdropdown")?.addEventListener("change",function(){

                                            let selectedtrailingValue = this.value;
                                                if (!selectedtrailingValue || !editor) return;

                                                //this will add or replace in code snippet
                                                let currentValue = editor.getValue();
                                                if (/"trail_type"\s*:\s*".*?"/.test(currentValue)) {
                                                  currentValue = currentValue.replace(
                                                    /("trail_type"\s*:\s*").*?(")/,
                                                    `$1${selectedtrailingValue}$2`
                                                  );
                                                } 
                                                  else {
                                                  // Remove the last closing brace
                                                  currentValue = currentValue.trim();
                                                  if (currentValue.endsWith("}")) {
                                                    currentValue = currentValue.slice(0, -1);
                                                  }
                                                  currentValue = currentValue.replace(/,\s*$/, "");

                                                      // Append new script value
                                                      currentValue+= `,\n \t"trail_type":"${selectedtrailingValue}" \n}`;
                                                  }
                                                
                                                editor.setValue(currentValue);


                                              let trailtriggerval=document.getElementById("trailingtrigger_value");  
                                              document.getElementById("ceSwitchCtn").appendChild(trailtriggerval)    
                                              document.getElementById("trailingtrigger_value").style.display="block";
                                              let  trailtriggerValbox= document.getElementById("trailtriggerValbox");
                                              let trailTriggerError = document.getElementById("trailTriggerError");


                                                trailtriggerValbox?.addEventListener("input", function () {

                                                  let trailTriggerValue=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailTriggerValue<0){
                                                      
                                                  let trailgap=document.getElementById("trailinggap_value");
                                                  document.getElementById("ceSwitchCtn").appendChild(trailgap);
                                                      trailTriggerError.style.display="block";
                                                      document.getElementById("trailinggap_value").style.display="none";

                                                    }
                                                    else{
                                                      
                                                  let trailgap=document.getElementById("trailinggap_value");
                                                  document.getElementById("ceSwitchCtn").appendChild(trailgap);
                                                      trailTriggerError.style.display="none";
                                                      document.getElementById("trailinggap_value").style.display="block";
                                                    }

                                                  if(!trailTriggerValue){
                                                    currentValue = currentValue.replace(/,?\s*"trail_trigger"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_trigger\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_trigger"\s*:\s*)\d*/,
                                                    `$1${trailTriggerValue}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_trigger":${trailTriggerValue}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                 
                                                 
                                                  //trail gap number box show
                                                document.getElementById("trailGapValbox")?.addEventListener("input",function(){
                                                  let trailgapError=document.getElementById("trailGapError");
                                                  let trailGapValue=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailGapValue<0){
                                                      trailgapError.style.display="block";
                                                      
                                                  let trailpoint=document.getElementById("trailingpoint_value");
                                                  document.getElementById("ceSwitchCtn").appendChild(trailpoint);
                                                      document.getElementById("trailingpoint_value").style.display="none";

                                                    }
                                                    else{
                                                      trailgapError.style.display="none";
                                                      
                                                  let trailpoint=document.getElementById("trailingpoint_value");
                                                  document.getElementById("ceSwitchCtn").appendChild(trailpoint);
                                                      document.getElementById("trailingpoint_value").style.display="block";
                                                    }

                                                  if(!trailGapValue){
                                                    currentValue = currentValue.replace(/,?\s*"trail_gap"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_gap\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_gap"\s*:\s*)\d*/,
                                                    `$1${trailGapValue}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_gap":${trailGapValue}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                  })   

                                                  //document.getElementById("trailingpoint_value").style.display="block"

                                                  //trail point input box
                                                  document.getElementById("trailPointValbox")?.addEventListener("input",function(){
                                                  let trailpointError=document.getElementById("trailPointError");
                                                  let trailpointVal=this.value.trim();
                                                  let currentValue=editor.getValue().trim();

                                                    if(trailpointVal<0){

                                                      trailpointError.style.display="block";

                                                    }
                                                    else{
                                                      trailpointError.style.display="none";
                                                      }

                                                  if(!trailpointVal){
                                                    currentValue = currentValue.replace(/,?\s*"trail_point"\s*:\s*\d+\s*/g, "");
                                                    // Also clean up trailing commas before }
                                                    currentValue = currentValue.replace(/,\s*}/, "\n}");
                                                    editor.setValue(currentValue);
                                                    return;
                                                  }

                                                  if(/\"trail_point\"\s*:\s*\d*/.test(currentValue)){
                                                    currentValue = currentValue.replace(
                                                    /("trail_point"\s*:\s*)\d*/,
                                                    `$1${trailpointVal}`
                                                    ); 
                                                  }
                                                  else{
                                                    if (currentValue.endsWith("}")) {
                                                            currentValue = currentValue.slice(0, -1).trim();
                                                          }
                                                          currentValue = currentValue.replace(/,(\s*})/, "$1");
                                                          currentValue = currentValue + `,\n\t"trail_point":${trailpointVal}\n}`;
                                                    }

                                                  editor.setValue(currentValue);
                                                  })   


                                                  
                                                });
                                        });


                      }
                      else{
                        document.getElementById("trailingtrigger_value").style.display="none";
                        document.getElementById("trailinggap_value").style.display="none";
                        document.getElementById("trailingpoint_value").style.display="none";
                        let code = editor.getValue();

                            code = code.replace(/,\s*"trail_type"\s*:\s*".*?"/g, "");
                            code = code.replace(/,\s*"trail_trigger"\s*:\s*[^,}]+/g, "");
                            code = code.replace(/,\s*"trail_gap"\s*:\s*[^,}]+/g, "");
                            code = code.replace(/,\s*"trail_point"\s*:\s*[^,}]+/g, "");

                            editor.setValue(code);
                      }
                }
                trailingSwitch.addEventListener("change",function(){
                  toggleIsTrailSet();
                  trailswitchReflect();
                })
              
            let quantityValue = this.value.trim();
            if (!quantityValue) {
              currentValue = currentValue.replace(/,?\s*"quantity"\s*:\s*\d+\s*/g, "");
              // Also clean up trailing commas before }
              currentValue = currentValue.replace(/,\s*}/, "\n}");
              editor.setValue(currentValue);
              return;
            }

            if (/\"quantity\"\s*:\s*\d*/.test(currentValue)) {
              // If already present => replace value only
              currentValue = currentValue.replace(
                /("quantity"\s*:\s*)\d*/,
                `$1${quantityValue}`
              );
            } 
            else {
              // If not present then add it at the end
              if (currentValue.endsWith("}")) {
                currentValue = currentValue.slice(0, -1).trim();
              }
              currentValue = currentValue.replace(/,(\s*})/, "$1");
              currentValue = currentValue + `,\n\t"quantity":${quantityValue}\n}`;
            }

           

            document.querySelectorAll('input[type="checkbox"]').forEach(toggleBtn => {
              toggleBtn.checked = false; // turn off all switches
              document.getElementById("targetdropdown").selectedIndex=0;
              document.getElementById("stoplossdropdown").selectedIndex=0;
              document.getElementById("trailingdropdown").selectedIndex=0;
              document.getElementById("target_value").value="";
              document.getElementById("stoploss_value").value="";
              document.getElementById("trailingtrigger_value").value="";
              document.getElementById("trailinggap_value").value="";
              document.getElementById("trailingpoint_value").value="";
              document.getElementById("rollover_value").value="";
              document.getElementById("rollover_time").value="00:00"


               targerSwitchReflect();
               stoplossSwitchReflect();
               trailswitchReflect();

            });
              

            // Remove related switch values from JSON
            currentValue = currentValue
              .replace(/"exit_on_opposite"\s*:\s*(true|false),?/g, '"exit_on_opposite": false,')
              .replace(/"is_tgt"\s*:\s*(true|false),?/g, '"is_tgt": false,')
              .replace(/"tgt_type"\s*:\s*".*?",?/g, "")
              .replace(/"tgt_value"\s*:\s*\d*/, "")
              .replace(/"is_sl"\s*:\s*(true|false),?/g, '"is_sl": false,')
              .replace(/"sl_type"\s*:\s*".*?",?/g, "")
              .replace(/"sl_value"\s*:\s*\d*/, "")
              .replace(/"is_trail_set"\s*:\s*(true|false),?/g, '"is_trail_set": false,')
              .replace(/"trail_type"\s*:\s*".*?",?/g, "")
              .replace(/"trail_trigger"\s*:\s*\d*/, "")
              .replace(/"trail_gap"\s*:\s*\d*/, "")
              .replace(/"trail_point"\s*:\s*\d*/, "");
                        
               editor.setValue(currentValue);
            })

            
              })
          
            })

        })

      })

}


function showslOrder(){
   document.getElementsByClassName("strategyorder")[0].style.display = "none";
}

    























// let switchContainer = document.getElementsByClassName("toggleSwitchGroup")[0];

//               let newSwitch = document.createElement("div");
//               newSwitch.className = "form-check form-switch";
//               newSwitch.innerHTML = `
//                                     <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheck5">
//                                     <label class="form-check-label" for="flexSwitchCheck">rollover </label>
//                                     <span class="details" data-bs-toggle="tooltip" data-bs-placement="top"
//                                         title="Enable this to automatically exit the position when opposite signal generated.">
//                                         <img src="images/info-circle.svg" class="m-2">
//                                     </span>
//               `;

//               switchContainer?.appendChild(newSwitch);


   
// productDropdown?.addEventListener("change",function(){
//   let numberbox=document.getElementById("showNumberBox");
//   numberbox.innerHTML = `<b class="m-2 ">Quantity <span class="text-muted">*</span></b>
//   <div>
//   <input type='number' id="quantityBox" placeholder="Enter Quantity" ></div>`;

//   let quantityNumber=document.getElementById("quantityBox");
//   quantityNumber?.addEventListener("input",function(){
//       if(quantityNumber.value <= 0){
//         console.log("checked")
//         let numberbox=document.getElementById("showNumberBox");
//         numberbox.innerHTML += `<small>Quantity must be greater than 0.</small>`
//       }
//       else{
//       console.log("else block")
//         numberbox.innerHTML= numberbox.innerHTML = `<b class="m-2 ">Quantity <span class="text-muted">*</span></b>
//          <div>
//          <input type='number' id="quantityBox" placeholder="Enter Quantity" ></div>`
//       }
//   });

// });
  
// });







// document.addEventListener("DOMContentLoaded",function(){
// let showDropdown=document.getElementById("productDropdown");
// showDropdown?.addEventListener("change",function(){
//    console.log("Raw value:", this.value);
//   console.log("SelectedValue:", this.value || "EMPTY");
//   let selectedValue = this.value;
//   console.log(selectedValue)
//   if (!selectedValue || !editor) return;

//   let currentValue = editor.getValue();
//   if (/"Option_Selection"\s*:\s*".*?"/.test(currentValue)) {
//     currentValue = currentValue.replace(
//       /("Option_Selection"\s*:\s*").*?(")/,
//       `$1${selectedValue}$2`
//     );
//   } else {
//     // Remove the last closing brace
//     currentValue = currentValue.trim();
//     if (currentValue.endsWith("}")) {
//       currentValue = currentValue.slice(0, -1);
//     }

//     // Add new line with snippet and closing brace
//      currentValue += ",\n  \t" + `"product":"${selectedValue}"`  +"}";
//   }
//   editor.setValue(currentValue);
// })


// showDropdown?.addEventListener("change",function(){
//   let numberbox=document.getElementById("showNumberBox");
//   numberbox.innerHTML = `<b class="m-2 ">Quantity <span class="text-muted">*</span></b>
//   <div>
//   <input type='number' id="quantityBox" placeholder="Enter Quantity" ></div>`

// });
  
// });



// let quantityNumber=document.getElementById("quantityBox");
// quantityNumber?.addEventListener("input",function(){
//   if(quantityNumber.value <= 0){
//     console.log("checked")
//     let numberbox=document.getElementById("showNumberBox");
//     numberbox.innerHTML=`<small>Quantity must be greater than 0.</small>`
//   }
// });




// const searchBox = document.getElementById("searchBox");
// //const dropdown = document.getElementById("dropdown2");
// const dropdownEl = document.getElementById("dropdown2");
// let timeout;


// // searchBox?.addEventListener("input",()=>{
// //     console.log(searchBox?.value)
// // })
// function debounce(fn, delay) {

//     return (...args) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => fn(...args), delay);
//     };
// }

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJmcmNoX2lkIjoxLCJlbWFpbCI6ImRldjMuYWxnb2RlbHRhQGdtYWlsLmNvbSIsIm1vYmlsZV9ubyI6IjkzMTMxODM4NDciLCJjdXN0X2lkIjoiNzM1NTQ3IiwiZW52IjoibWFpbiIsInVzZXJfdHlwZSI6InVzZXIiLCJpYXQiOjE3NTU2NjMwNzksImV4cCI6MTc1NTc0OTQ3OX0.kSCPiQ4dWtAx-sgxVRDyHXsKYCsbuuvZRtTH0MCO4Wk"
// async function fetchResults(query) {
//     let scriptType = document.getElementById("dropdown1")?.value;
//     console.log("Calling API with:", { query, scriptType });
//     try {
//         const res = await fetch("https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": token
//             },
//             body: JSON.stringify({
//                 script: query,
//                 type: scriptType
//             })
//         });

//         const data = await res.json();
//         console.log("API Response:", data); // debug check

//         dropdownEl.innerHTML = "";
//         if (data.results && data.results.length > 0) {
//             dropdownEl.style.display = "block";
//             data.results.forEach(item => {
//                 const div = document.createElement("div");
//                 div.textContent = item.name;
//                 div.style.padding = "6px 10px";
//                 div.style.cursor = "pointer";
//                 div.onclick = () => {
//                     searchBox.value = item.name;
//                     dropdownEl.style.display = "none";

//                     // also update Monaco default value
//                     let current = editor.getValue();
//                     try {
//                         let obj = JSON.parse(current);
//                         obj.script = { name: item.name, type: scriptType };
//                         editor.setValue(JSON.stringify(obj, null, 2));
//                     } catch (e) {
//                         console.error("Editor JSON invalid:", e);
//                     }
//                 };
//                 dropdownEl.appendChild(div);
//             });
//         } else {
//             dropdownEl.style.display = "none";
//         }
//     } catch (err) {
//         console.error("Fetch error:", err);
//     }
// }

// searchBox?.addEventListener("input", debounce((e) => {
//     let scriptType = document.getElementById("dropdown1")?.value;

//     const query = e.target.value.trim();
//     if (query.length > 1) {
//         console.log("Payload:", { search: query, type: scriptType });

//         fetchResults(query);
//     } else {
//         dropdown.style.display = "none";
//     }
// }, 500));




// async function fetchResults(query) {
// let scriptType=dropdownEl?.value;
//     try {
//         const res = await fetch("https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": token
//             },
//             body: JSON.stringify({ script: query ,type:scriptType })
//         });

//         const data = await res.json();
//         dropdown.innerHTML = "";
//         if (data.results && data.results.length > 0) {
//             dropdown.style.display = "block";
//             console.log(dropdown?.value)
//             data.results.forEach(item => {
//                 const div = document.createElement("div");
//                 div.textContent = item.name;
//                 div.onclick = () => {
//                     searchBox.value = item.name;
//                     dropdown.style.display = "none";
//                 };
//                 dropdown.appendChild(div);
//             });
//         } else {
//             dropdown.style.display = "none";
//         }
//     } catch (err) {
//         console.error(err);
//     }
// }

// searchBox?.addEventListener("input", debounce((e) => {
//     const query = e.target.value.trim();
//     if (query.length > 1) {
//         fetchResults(query);
//     } else {
//         dropdown.style.display = "none";
//     }
// }, 500));



// fetch("https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript")
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.error(err));