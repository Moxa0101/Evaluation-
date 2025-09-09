var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)

});


let editor;

require.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.52.0/min/vs" } });

require(["vs/editor/editor.main"], function () {
  window.getCodeSnippet = getCodeSnippet;

  const container = document.getElementsByClassName("generatedCode")[0];

  function getCodeSnippet(activeType) {
    if (activeType === "strategy_order") {
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
    else {
      return `{
    "type": "${activeType}"
}`;
    }
  }

  editor = monaco.editor.create(container, {
    value: getCodeSnippet("strategy_order"),
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


function cleanupOptionalAndTooltip() {
  // remove all extra-info spans
  document.querySelectorAll(".extra-info").forEach(el => el.remove());

  // restore * for all labels that had it
  document.querySelectorAll("#scriptType b, #scriptsearchbox b, #productType b").forEach(b => {
    if (!b.querySelector("span.text-muted")) {
      const star = document.createElement("span");
      star.className = "text-muted";
      star.textContent = "*";
      b.appendChild(star);
    }
  });
}

let activeNav = "strategy_order"; // default
const navLinks = document.querySelectorAll(".nav-link");

document.getElementById("deleteBtn").addEventListener("click", function () {
  let activeNavItem = activeNav
  editor.setValue(getCodeSnippet(activeNavItem));

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
      const alertBox = document.getElementById('copyAlert');
      alertBox.style.display = 'block';
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 3000);
    })
});

function upsertJson(key, value) {
  if (!editor) return;

  let code = editor.getValue();
  let obj;

  try {
    obj = JSON.parse(code);
  } catch (e) {
    console.error("Invalid JSON in editor:", e);
    return;
  }

  if (value === "" || value == null) {
    delete obj[key]; // remove key if empty
  } else {
    let parsedVal;

    if (value === "true") parsedVal = true;
    else if (value === "false") parsedVal = false;
    else if (value === "null") parsedVal = null;
    else if (!isNaN(value)) parsedVal = Number(value); // numbers
    else parsedVal = value; // string

    obj[key] = parsedVal;
  }

  editor.setValue(JSON.stringify(obj, null, 2));
}

// dependency mapping
const commonTargets = [
  { container: "#productType", field: "#productDropdown" },
  { container: "#quantityBlock", field: "#quantityBox" },
  { container: "#toggleSwitchGroup", field: ".form-check-input" },
  { container: "#BtnGroup", field: null },
  { container: "#rollover_value", field: "#rollovervalbox" },
  { container: "#rollover_time", field: "#timeBox" },
  { container: "#targetDropdownCtn", field: "#targetdropdown" },
  { container: "#target_value", field: "#targetValbox" },
  { container: "#stoplossDropdownCtn", field: "#stoplossdropdown" },
  { container: "#stoploss_value", field: "#stoplossValbox" },
  { container: "#trailingDropdownCtn", field: "#trailingdropdown" },
  { container: "#trailingtrigger_value", field: "#trailtriggerValbox" },
  { container: "#trailinggap_value", field: "#trailGapValbox" },
  { container: "#trailingpoint_value", field: "#trailPointValbox" },
  { container: "#rollover_value", field: "#rollovervalbox" },
  { container: "#rollover_time", field: "#timeBox" },

]

const navchangeHide = [
  { container: "#scriptType", field: "select" },        // stays visible
  { container: "#optionSelection", field: "select" },
  { container: "#scriptsearchbox", field: "input" },
  { container: "#premiumval", field: "input" },
  { container: "#maxvariationCtn", field: "input" },
  { container: "#AtmGap", field: "input" },
  { container: "#expiryGap", field: "input" },
  { container: "#expiryType", field: "select" },
  { container: "#limitPrice", field: "input" },
  { container: "#triggerPrice", field: "input" }
]

const dependencies = [
  {
    trigger: "strategy_order",
    event: null,
    targets: [
      ...navchangeHide,
      ...commonTargets,

    ]
  },

  {
    trigger: "limit_order",
    event: null,
    targets: [
      ...navchangeHide,
      ...commonTargets,

    ]
  },
  {
    trigger: "sl_order",
    event: null,
    targets: [
      ...navchangeHide,
      ...commonTargets,

    ]
  },
  {
    trigger: "squareoff_position",
    event: null,
    targets: [
      ...navchangeHide,
      ...commonTargets
    ]
  },
  {
    trigger: "cancel_order",
    event: null,
    targets: [
      ...navchangeHide,
      ...commonTargets
    ]
  },


  {
    trigger: "#dropdown1", // event trigger (class or ID)
    event: "change",
    targets: [
      { container: "#optionSelection", field: "#atmdropdown" },
      { container: '#scriptsearchbox', field: "#search" },
      { container: "#expiryGap", field: "#futExpiryGap" },
      { container: "#expiryType", field: "#timelineDropdown" },
      { container: "#maxvariationCtn", field: "#maxvariationbox" },
      { container: "#premiumval", field: "#premiumbox" },
      { container: "#AtmGap", field: "#atmgapbox" },
      { container: "#limitPrice", field: "#priceLimit" },
      { container: "#triggerPrice", field: "#triggerpriceBox" },
      ...commonTargets
    ]
  },

  {
    trigger: "#atmdropdown",
    event: "change",
    targets: [
      { container: '#scriptsearchbox', field: "#search" },
      { container: "#productType", field: "#productDropdown" },
      { container: '#premiumval', field: "#premiumbox" },
      { container: "#AtmGap", field: "#atmgapbox" },
      { container: "#maxvariationCtn", field: "#maxvariationbox" },
      ...commonTargets
    ]
  },
  {
    trigger: "#premiumbox",
    event: "input",
    targets: [
      { container: "#premiumval", field: "#maxvariationCtn" },
      ...commonTargets

    ]
  },
  {
    trigger: "#productDropdown",
    event: "change",
    targets: [
      { container: "#quantityBlock", field: "#quantityBox" },
      { container: "#toggleSwitchGroup", field: ".form-check-input" },
      { container: "#BtnGroup", field: null },
      { container: "#rollover_value", field: "#rollovervalbox" },
      { container: "#rollover_time", field: "#timeBox" },
      { container: "#targetDropdownCtn", field: "#targetdropdown" },
      { container: "#target_value", field: "#targetValbox" },
      { container: "#stoplossDropdownCtn", field: "#stoplossdropdown" },
      { container: "#stoploss_value", field: "#stoplossValbox" },
      { container: "#trailingDropdownCtn", field: "#trailingdropdown" },
      { container: "#trailingtrigger_value", field: "#trailtriggerValbox" },
      { container: "#trailinggap_value", field: "#trailGapValbox" },
      { container: "#trailingpoint_value", field: "#trailPointValbox" },
      { container: "#rollover_value", field: "#rollovervalbox" },
      { container: "#rollover_time", field: "#timeBox" },
      { container: "#limitPrice", field: "#priceLimit" },
      { container: "#triggerPrice", field: "#triggerpriceBox" },
    ]
  },
  {
    trigger: "#quantityBox",
    event: "input",
    targets: [
      { container: "#toggleSwitchGroup", field: ".form-check-input" },
      { container: "#rollover_value", field: "#rollovervalbox" },
      { container: "#rollover_time", field: "#timeBox" },
      { container: "#targetDropdownCtn", field: "#targetdropdown" },
      { container: "#target_value", field: "#targetValbox" },
      { container: "#stoplossDropdownCtn", field: "#stoplossdropdown" },
      { container: "#stoploss_value", field: "#stoplossValbox" },
      { container: "#trailingDropdownCtn", field: "#trailingdropdown" },
      { container: "#trailingtrigger_value", field: "#trailtriggerValbox" },
      { container: "#trailinggap_value", field: "#trailGapValbox" },
      { container: "#trailingpoint_value", field: "#trailPointValbox" },
      { container: "#rollover_value", field: "#rollovervalbox" },
      { container: "#rollover_time", field: "#timeBox" },
      { container: "#limitPrice", field: "#priceLimit" },
      { container: "#triggerPrice", field: "#triggerpriceBox" },
      { container: "#BtnGroup", field: null }

    ]
  }
];

function hideAndReset(triggerSelector, eventType = null) {
  dependencies.forEach(dep => {
    if (dep.trigger === triggerSelector && (eventType === null || dep.event === eventType)) {
      dep.targets.forEach((t, index) => {
        const container = document.querySelector(t.container);
        if (container) {
          // If it's the *direct child* (first dependent) → only reset value
          if (index === 0) {
            if (t.field) {
              const field = container.querySelector(t.field);
              if (field) {
                if (field.tagName === "SELECT") field.selectedIndex = 0;
                else if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") field.value = "";
              }
            }
          } else {
            // Other deeper dependents → hide + reset
            container.style.display = "none";
            if (t.field) {
              const field = container.querySelector(t.field);
              if (field) {
                if (field.tagName === "SELECT") field.selectedIndex = 0;
                else if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
                  if (field.type === "checkbox" || field.type === "radio") {
                    field.checked = false;
                  } else {
                    field.value = "";
                  }
                }
                else if (field.tagName === "BUTTON") {
                  field.classList.remove("active"); // reset toggles / buy-sell
                }
              }
            }
          }
        }
      });
    }
  });
}

function updateActiveNavUI() {
  navLinks.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`[data-type="${activeNav}"]`);
  if (activeLink) activeLink.classList.add("active");

  // Reset dependent UI
  hideAndReset(activeNav);
  cleanupOptionalAndTooltip();

  // Update editor
  editor.setValue(getCodeSnippet(activeNav));
   const scriptSearchEl = document.querySelector("#search");
  if (scriptSearchEl) scriptSearchEl.disabled = true;

  // Special handling for cancel/squareoff
  if (activeNav === "cancel_order" || activeNav === "squareoff_position") {
    showScriptUI(activeNav);
  }
}

// Handle nav click
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    activeNav = link.getAttribute("data-type"); // update active nav
    updateActiveNavUI();
  });
});

function resetEditorFields(keysToReset = []) {
  try {
    let code = editor.getValue();
    let jsonObj = JSON.parse(code);

    keysToReset.forEach(key => {
      if (jsonObj.hasOwnProperty(key)) {
        if (typeof jsonObj[key] === "boolean" || jsonObj[key] === "true" || jsonObj[key] === "false") {
          jsonObj[key] = false;   // force to boolean false
        } else {
          delete jsonObj[key];    // numbers/strings → erase
        }
      }
    });

    editor.setValue(JSON.stringify(jsonObj, null, 2));
  } catch (err) {
    console.error("Invalid JSON in editor:", err);
  }
}


let scriptType = document.getElementById("dropdown1");
scriptType.addEventListener("change", function () {
  document.getElementById("search").disabled=false;
  if (!(activeNav === "cancel_order" || activeNav === "squareoff_position")) {
    hideAndReset("#dropdown1", "change");
    resetEditorFields(["option_selection", "script", "product", "quantity", "premium_value", "max_variation", "expiry_gap", "expiry_type", "exit_on_opposite", "is_tgt", "tgt_type", "tgt_value", "is_sl", "sl_type", "sl_value", "is_trail_set", "trail_type", "trail_trigger", "trail_gap", "trail_point", "is_rollover", "rollover_time"])
  }
  upsertJson("script_type", this.value, true);
  if (activeNav === "strategy_order") {
    upsertJson("is_rollover", "false", false);
  }

  if (activeNav === "strategy_order" && scriptType.value === "CE" || activeNav === "strategy_order" && scriptType.value === "PE") {
    document.getElementById("optionSelection").style.display = "block";
    document.getElementById("scriptsearchbox").style.display = "none";
    document.getElementById("atmdropdown").addEventListener("change", function () {
      resetEditorFields(["script", "product", "quantity", "premium_value", "max_variation", "expiry_gap", "expiry_type", "exit_on_opposite", "is_tgt", "tgt_type", "tgt_value", "is_sl", "sl_type", "sl_value", "is_trail_set", "trail_type", "trail_trigger", "trail_gap", "trail_point", "is_rollover", "rollover_time"])
      hideAndReset("#atmdropdown", "change");
      upsertJson("option_selection", this.value, true);
      document.getElementById("scriptsearchbox").style.display = "block";
    })
  }
  else if (activeNav === "limit_order" || activeNav === "sl_order" || activeNav === "strategy_order") {
    document.getElementById("scriptsearchbox").style.display = "block"
    document.getElementById("optionSelection").style.display = "none";
  }
})

let searchInput = document.getElementById("search");
const dropdown = document.getElementById('dropdown');
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJmcmNoX2lkIjoxLCJlbWFpbCI6ImRldjMuYWxnb2RlbHRhQGdtYWlsLmNvbSIsIm1vYmlsZV9ubyI6IjkzMTMxODM4NDciLCJjdXN0X2lkIjoiNzM1NTQ3IiwiZW52IjoibWFpbiIsInVzZXJfdHlwZSI6InVzZXIiLCJpYXQiOjE3NTY0NDAxMTMsImV4cCI6MTc1NjUyNjUxM30.MIj8JLqwPbdxEWgX179ELK-mU60pfW1--kiLlHqIzR0"
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
  let optionSelection = document.getElementById("atmdropdown")?.value;
  let navSelection = activeNav;
  try {
    let payload = {
      script: query,
      type: scriptType
    };

    if (navSelection === "strategy_order" && (scriptType === "CE" || scriptType === "PE")) {
      payload.option_selection = optionSelection;
    }

    // Choose API endpoint based on active nav
    let apiUrl = "";
    if (navSelection === "strategy_order") {
      apiUrl = "https://betabv4.algodelta.com/api/v4/users/jsonbridge/searchscript";
    } else {
      apiUrl = "https://betabv4.algodelta.com/api/v4/scripts/searchscriptsbytype";
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    const suggestions = data.data || [];

    if (activeNav === "strategy_order") {
      dropdown.innerHTML = suggestions.map(item =>
        `<li>${item.script} (${item.exchange})</li>`).join('');
      dropdown.style.display = suggestions.length ? 'block' : 'none';
    }
    else {
      dropdown.innerHTML = suggestions.map(item =>
        `<li>${item.symbol} (${item.exchange})</li>`).join('');
      dropdown.style.display = suggestions.length ? 'block' : 'none';

    }

  } catch (err) {
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
    upsertJson("script", selectedText, true);
    if (activeNav === "strategy_order" && scriptType?.value === "EQ") {
      console.log()
      document.getElementById("productType").style.display = "block";
      productDropdownFurther(scriptType?.value);
    }
    else if (activeNav === "strategy_order" && scriptType.value === "FUT") {
      document.getElementById("expiryGap").style.display = "block";
    }
    else if (activeNav === "strategy_order" && document.getElementById("atmdropdown").value === "SYMBOL_BASED") {
      document.getElementById("productType").style.display = "block";
      productDropdownFurther();
    }
    else if (activeNav === "strategy_order" && document.getElementById("atmdropdown").value === "PREMIUM_BASED") {
      document.getElementById("premiumval").style.display = "block";
      premiumValShow();
    }
    else if (activeNav === "strategy_order" && document.getElementById("atmdropdown").value === "ATM_BASED") {
      document.getElementById("AtmGap").style.display = "block";
      atmValShow();
    }
    else if (activeNav === "limit_order" || activeNav === "sl_order") {
      document.getElementById("productType").style.display = "block";
      limitSlOrderShow();
    }

  }
});


searchInput.addEventListener('input', debounce(e => {
  fetchSuggestions(e.target.value);
}, 300));

let dropdownofTarget = document.getElementById("targetDropdownCtn");
const targetSwitch = document.getElementById('flexSwitchCheck2');
//onchange toggles the switch, call the function and also shows dropdown

function toggleIsTgt() {
  upsertJson("is_tgt", targetSwitch.checked.toString());
  if (!(targetSwitch.checked)) {
    document.getElementById("targetdropdown").selectedIndex = 0;
    document.getElementById("targetValbox").value = "";
  }
}
function targetSwitchReflect() {
  dropdownofTarget.style.display = targetSwitch.checked ? 'block' : 'none';
  if (dropdownofTarget.style.display === "block") {
    document.getElementById("targetdropdown")?.addEventListener("change", function () {
      upsertJson("tgt_type", this.value, true);
      document.getElementById("target_value").style.display = "block";
      document.getElementById("targetValbox").value = "";
      let targetValBox = document.getElementById("targetValbox");
      let targetErr = document.getElementById("targetError");


      targetValBox?.addEventListener("input", function () {
        upsertJson("tgt_value", this.value, true)
        let targetValue = this.value.trim();

        if (targetValue < 0) {
          targetErr.style.display = "block";
        }
        else {
          targetErr.style.display = "none";
        }

      });
    });
  }
  else {
    document.getElementById("target_value").style.display = "none";
    resetEditorFields(["tgt_type", "tgt_value", "is_tgt"])
    document.getElementById("targetValbox").value = "";
  }

};

const stoplossSwitch = document.getElementById('flexSwitchCheck3');
function toggleIsSl() {
  upsertJson("is_sl", stoplossSwitch.checked.toString())
  if (!(stoplossSwitch.checked)) {
    document.getElementById("stoplossdropdown").selectedIndex = 0;
    document.getElementById("stoploss_value").value = "";
  }

}
function stoplossSwitchReflect() {
  let dropdownOfStoploss = document.getElementById("stoplossDropdownCtn");
  dropdownOfStoploss.style.display = stoplossSwitch.checked ? 'block' : 'none';
  if (dropdownOfStoploss.style.display === "block") {
    document.getElementById("stoplossdropdown")?.addEventListener("change", function () {
      upsertJson("sl_type", this.value, true)

      document.getElementById("stoploss_value").style.display = "block";
      let stoplossValbox = document.getElementById("stoplossValbox");
      let stoplossErr = document.getElementById("stoplossError");


      stoplossValbox?.addEventListener("input", function () {
        let stoplossValue = this.value.trim();
        upsertJson("sl_value", stoplossValue, false)

        if (stoplossValue < 0) {
          stoplossErr.style.display = "block";
          resetEditorFields(["sl_value"]);
        }
        else {
          stoplossErr.style.display = "none";
        }

      });


    });
  }
  else {
    document.getElementById("stoploss_value").style.display = "none";
    resetEditorFields(["sl_type", "sl_value", "is_sl"]);
  }


};

const trailingSwitch = document.getElementById('flexSwitchCheck4');

function toggleIsTrailSet() {
  upsertJson("is_trail_set", trailingSwitch.checked.toString());
  if (!(trailingSwitch.checked)) {
    document.getElementById("trailingdropdown").selectedIndex = 0;
    document.getElementById("trailingtrigger_value").value = "";
    document.getElementById("trailinggap_value").value = "";
    document.getElementById("trailingpoint_value").value = "";
  }
}
function trailswitchReflect() {
  let dropdownOfTrailing = document.getElementById("trailingDropdownCtn");
  dropdownOfTrailing.style.display = trailingSwitch.checked ? 'block' : 'none';

  if (dropdownOfTrailing.style.display === "block") {

    document.getElementById("trailingdropdown")?.addEventListener("change", function () {
      upsertJson("trail_type", this.value, true)

      document.getElementById("trailingtrigger_value").style.display = "block";
      let trailtriggerValbox = document.getElementById("trailtriggerValbox");
      let trailTriggerError = document.getElementById("trailTriggerError");


      trailtriggerValbox?.addEventListener("input", function () {

        let trailTriggerValue = this.value.trim();
        //let currentValue = editor.getValue().trim();
        upsertJson("trail_trigger", trailTriggerValue, false);

        if (trailTriggerValue < 0) {
          trailTriggerError.style.display = "block";
          document.getElementById("trailinggap_value").style.display = "none";

        }
        else {
          trailTriggerError.style.display = "none";
          document.getElementById("trailinggap_value").style.display = "block";
        }

        if (!trailTriggerValue) {
          resetEditorFields(["trail_trigger", "trail_gap", "trail_point"]);
        }


        //trail gap number box show
        document.getElementById("trailGapValbox")?.addEventListener("input", function () {
          let trailgapError = document.getElementById("trailGapError");
          let trailGapValue = this.value.trim();
          //let currentValue = editor.getValue().trim();
          upsertJson("trail_gap", trailGapValue, false)
          if (trailGapValue < 0) {
            trailgapError.style.display = "block";
            document.getElementById("trailingpoint_value").style.display = "none";

          }
          else {
            trailgapError.style.display = "none";
            document.getElementById("trailingpoint_value").style.display = "block";
          }

          if (!trailGapValue) {
            resetEditorFields(["trail_gap", "trail_point"])
          }
        })

        //document.getElementById("trailingpoint_value").style.display="block"

        //trail point input box
        document.getElementById("trailPointValbox")?.addEventListener("input", function () {
          let trailpointError = document.getElementById("trailPointError");
          let trailpointVal = this.value.trim();
          //let currentValue = editor.getValue().trim();
          upsertJson("trail_point", trailpointVal, false);

          if (trailpointVal < 0) {
            trailpointError.style.display = "block";

          }
          else {
            trailpointError.style.display = "none";
          }

          if (!trailpointVal) {
            resetEditorFields(["trail_point"]);
          }
        })



      });
    });
  }
  else {
    document.getElementById("trailingtrigger_value").style.display = "none";
    document.getElementById("trailinggap_value").style.display = "none";
    document.getElementById("trailingpoint_value").style.display = "none";
    resetEditorFields(["is_trail_set", "trail_type", "trail_trigger", "trail_gap", "trail_point"]);
  }
}


const rolloverSwitch = document.getElementById('flexSwitchCheck5');
function toggleIsRollover() {
  upsertJson("is_rollover", rolloverSwitch.checked.toString());
  if (!(trailingSwitch.checked)) {
    document.getElementById("rollovervalbox").value = "";
    document.getElementById("timeBox").value = "00:00";
  }
}
function rollOverSwitchReflect() {
  let rolloverCtn = document.getElementById("rollover_value");
  rolloverCtn.style.display = rolloverSwitch.checked ? 'block' : 'none';
  if (rolloverCtn.style.display === "block") {
    let rolloverVal = document.getElementById("rollovervalbox");
    let rolloverErr = document.getElementById("rolloverError");
    rolloverVal?.addEventListener("input", function () {
      upsertJson("rollover_gap", this.value, true);
      if (rolloverVal?.value < 0) {
        rolloverErr.style.display = "block";
      }
      else {
        rolloverErr.style.display = "none";
        document.getElementById("rollover_time").style.display = "block"
      }
      document.getElementById("timeBox").addEventListener("input", function () {
        upsertJson("rollover_time", this.value, true);
      })

    });
  }
  else {
    document.getElementById("rollover_value").style.display = "none";
    document.getElementById("rollover_time").style.display = "none";
    resetEditorFields(["is_rollover", "rollover_time", "rollover_gap"]);
  }
}

function productDropdownFurther() {
  document.getElementById("productDropdown").addEventListener("change", function () {
    resetEditorFields(["quantity", "exit_on_opposite", "is_tgt", "tgt_type", "tgt_value", "is_sl", "sl_type", "sl_value", "is_trail_set", "trail_type", "trail_trigger", "trail_gap", "trail_point", "is_rollover", "rollover_time"])
    hideAndReset("#productDropdown", "change");
    upsertJson("product", this.value, true);
    document.getElementById("quantityBlock").style.display = "block";
    document.getElementById("quantityBox").addEventListener("input", function () {
      const switches = document.querySelectorAll("#toggleSwitchGroup .form-check-input");
      switches.forEach(sw => sw.checked = false);

      // Hide related dropdowns
      hideAndReset("#quantityBox", "input");
      resetEditorFields(["exit_on_opposite", "is_tgt", "tgt_type", "tgt_value", "is_sl", "sl_type", "sl_value", "is_trail_set", "trail_type", "trail_trigger", "trail_gap", "trail_point", , "is_rollover", "rollover_time"])


      upsertJson("quantity", this.value, false)
      if (document.getElementById("quantityBox")?.value <= 0) {
        document.getElementById("quantityError").style.display = "block";
        document.getElementById("BtnGroup").style.display = "none";
        document.getElementById("toggleSwitchGroup").style.display = "none";
        document.getElementById("rolloverSwitch").style.display = "none";
      }
      else {
        document.getElementById("quantityError").style.display = "none";
        if (activeNav === "strategy_order") {
          document.getElementById("BtnGroup").style.display = "block";
          document.getElementById("toggleSwitchGroup").style.display = "block";
          document.getElementById("toggleSwitchGroup").style.display = "flex";
          document.getElementById("toggleSwitchGroup").style.flexDirection = "row";
          document.getElementById("toggleSwitchGroup").style.flexWrap = "wrap";
        }
        if (!(scriptType?.value === "EQ")) {
          document.getElementById("rolloverSwitch").style.display = "block";
        }
      }
      let buy = document.getElementsByClassName("buyBtn")[0];
      let sell = document.getElementsByClassName("sellBtn")[0];

      buy.addEventListener("click", function () {
        buy.style.background = "green";
        sell.style.background = "";
        upsertJson("transaction_type", "BUY", true)
      })
      sell.addEventListener("click", function () {
        sell.style.background = "red";
        buy.style.background = "";
        upsertJson("transaction_type", "SELL", true)
      })
      const exitOnPurposeSwitch = document.getElementById('flexSwitchCheck1');

      function toggleExitOnOpposite() {
        upsertJson("exit_on_opposite", exitOnPurposeSwitch.checked.toString());
      }
      exitOnPurposeSwitch?.addEventListener('change', toggleExitOnOpposite);
      const targetSwitch = document.getElementById('flexSwitchCheck2');
      targetSwitch.addEventListener("change", function () {
        toggleIsTgt();
        targetSwitchReflect();
      })

      if (!(scriptType?.value === "EQ")) {
        const rolloverSwitch = document.getElementById('flexSwitchCheck5');
        rolloverSwitch.addEventListener("change", function () {
          toggleIsRollover();
          rollOverSwitchReflect();
        })
      }



      //check the val true or false and shows box according

      //stoploss switch
      const stoplossSwitch = document.getElementById('flexSwitchCheck3');
      stoplossSwitch.addEventListener("change", function () {
        toggleIsSl();
        stoplossSwitchReflect();

      })

      //trailing switch
      const trailingSwitch = document.getElementById('flexSwitchCheck4');

      trailingSwitch.addEventListener("change", function () {
        toggleIsTrailSet();
        trailswitchReflect();
      })
    });



    document.querySelectorAll('input[type="checkbox"]').forEach(toggleBtn => {
      toggleBtn.checked = false; // turn off all switches
      document.getElementById("targetdropdown").selectedIndex = 0;
      document.getElementById("stoplossdropdown").selectedIndex = 0;
      document.getElementById("trailingdropdown").selectedIndex = 0;
      document.getElementById("target_value").value = "";
      document.getElementById("stoploss_value").value = "";
      document.getElementById("trailingtrigger_value").value = "";
      document.getElementById("trailinggap_value").value = "";
      document.getElementById("trailingpoint_value").value = "";
      targetSwitchReflect();
      stoplossSwitchReflect();
      trailswitchReflect();

    });

    resetEditorFields(["exit_on_opposite", "is_tgt", "tgt_type", "tgt_value", "is_sl", "sl_type", "sl_value", "is_trail_set", "trail_type", "trail_trigger", "trail_gap", "trail_point", "is_rollover", "rollover_time"]);
  })
}

scriptType.addEventListener("change", function () {
  document.getElementById("futExpiryGap").addEventListener("input", function () {
    upsertJson("expiry_gap", this.value, false)
    if (activeNav === "strategy_order" && scriptType.value === "FUT") {
      document.getElementById("productType").style.display = "block";
      if (document.getElementById("futExpiryGap")?.value <= 0) {
        document.getElementById("futExpiryGapError").style.display = "block";

      }
      else {
        document.getElementById("futExpiryGapError").style.display = "none";
        document.getElementById("timelineDropdown").value = "monthly";
        document.getElementById("timelineDropdown").disabled = true;
        document.getElementById("expiryType").style.display = "block"
        upsertJson("expiry_type", "monthly", true);
      }
      productDropdownFurther();
    }
  });
});

function premiumValShow() {
  document.getElementById("premiumbox").addEventListener("input", function () {
    document.getElementById("maxvariationCtn").style.display = "block";
    document.getElementById("maxvariationbox").value = 10;
    document.getElementById("expiryGap").style.display = "block";
    upsertJson("premium_value", this.value, false)
    upsertJson("max_variation", "10", false);
    let premiumnumber = Number(this.value);
    let premiumerror = document.getElementById("premiumvalError");
    if (premiumnumber < 0) {
      premiumerror.style.display = "block";
    }
    else {
      premiumerror.style.display = "none"
    }

    document.getElementById("maxvariationbox").addEventListener("input", function () {
      upsertJson("max_variation", this.value, false);
      let maxvariation = Number(this.value);
      let varErr = document.getElementById("maxvariationError");
      if (maxvariation < 10) {
        varErr.style.display = "block";
      }
      else {
        varErr.style.display = "none"
      }

    });
    document.getElementById("futExpiryGap").addEventListener("input", function () {
      document.getElementById("expiryType").style.display = "block";
      document.getElementById("timelineDropdown").disabled = false;
      document.getElementById("timelineDropdown").selectedIndex = 0;
      upsertJson("expiry_gap", this.value, false);
      let expiryGap = Number(this.value);
      let expiryErr = document.getElementById("futExpiryGapError");
      if (expiryGap < 0) {
        expiryErr.style.display = "block";
      }
      else {
        expiryErr.style.display = "none"
      }
    })
    document.getElementById("timelineDropdown").addEventListener("change", function () {
      upsertJson("expiry_type", this.value, true);
      document.getElementById("productType").style.display = "block";
      productDropdownFurther();

    })
  })
}

function atmValShow() {
  document.getElementById("atmgapbox").addEventListener("input", function () {
    upsertJson("atm_gap", this.value, false);
    document.getElementById("expiryGap").style.display = "block";
  });
  document.getElementById("futExpiryGap").addEventListener("input", function () {
    document.getElementById("expiryType").style.display = "block";
    document.getElementById("timelineDropdown").disabled = false;
    document.getElementById("timelineDropdown").selectedIndex = 0;
    upsertJson("expiry_gap", this.value, false);
    let expiryGap = Number(this.value);
    let expiryErr = document.getElementById("futExpiryGapError");
    if (expiryGap < 0) {
      expiryErr.style.display = "block";
    }
    else {
      expiryErr.style.display = "none"
    }
  })
  document.getElementById("timelineDropdown").addEventListener("change", function () {
    upsertJson("expiry_type", this.value, true);
    document.getElementById("productType").style.display = "block";
    productDropdownFurther();

  })

}


function limitSlOrderShow() {
  document.getElementById("productDropdown").addEventListener("change", function () {
    resetEditorFields(["quantity", "script", "product", "price", "trigger_price", "transaction_type"])
    hideAndReset("#productDropdown", "change");
    upsertJson("product", this.value, true);
    document.getElementById("quantityBlock").style.display = "block";
    document.getElementById("quantityBox").addEventListener("input", function () {
      hideAndReset("#quantityBox", "input");
      resetEditorFields(["script", "product", "price", "trigger_price", "transaction_type"])

      upsertJson("quantity", this.value, false)
      if (document.getElementById("quantityBox")?.value <= 0) {
        document.getElementById("quantityError").style.display = "block";

      }
      else {
        document.getElementById("quantityError").style.display = "none";
        if (!(activeNav === "strategy_order")) {
          document.getElementById("limitPrice").style.display = "block";
        }
      }
      document.getElementById("priceLimit").addEventListener("input", function () {
        upsertJson("price", this.value, false);
        if (document.getElementById("priceLimit")?.value < 0) {
          document.getElementById("PriceError").style.display = "block";
        }
        else {
          document.getElementById("PriceError").style.display = "none";
          if (activeNav === "sl_order") {
            document.getElementById("triggerPrice").style.display = "block";
            document.getElementById("triggerpriceBox").addEventListener("input", function () {
              upsertJson("trigger_price", this.value, false);
              if (document.getElementById("triggerPrice")?.value <= 0) {
                document.getElementById("triggerPriceError").style.display = "block";
              }
              else {
                document.getElementById("triggerPriceError").style.display = "none";
                document.getElementById("BtnGroup").style.display = "block";
                let buy = document.getElementsByClassName("buyBtn")[0];
                let sell = document.getElementsByClassName("sellBtn")[0];

                buy.addEventListener("click", function () {
                  buy.style.background = "green";
                  sell.style.background = "";
                  upsertJson("transaction_type", "BUY", true)
                })
                sell.addEventListener("click", function () {
                  sell.style.background = "red";
                  buy.style.background = "";
                  upsertJson("transaction_type", "SELL", true)
                })
              }
            })
          }
          else {
            document.getElementById("BtnGroup").style.display = "block";
            let buy = document.getElementsByClassName("buyBtn")[0];
            let sell = document.getElementsByClassName("sellBtn")[0];

            buy.addEventListener("click", function () {
              buy.style.background = "green";
              sell.style.background = "";
              upsertJson("transaction_type", "BUY", true)
            })
            sell.addEventListener("click", function () {
              sell.style.background = "red";
              buy.style.background = "";
              upsertJson("transaction_type", "SELL", true)
            })
          }

        }

      })
    });
  });
}



function showScriptUI(containerId) {
  const tooltips = {
    squareoff_position: [
      { id: "scriptType", text: "Script Type", tooltip: "Select the script type to narrow down which position you want to squareoff; otherwise, all open positions will be squareoff" },
      { id: "scriptsearchbox", text: "Script", tooltip: "Choose specific script to squareoff only that position; otherwise, all open positions will be squareoff" },
      { id: "productType", text: "Product", tooltip: "Choose specific product to squareoff only that position; otherwise, all open positions will be squareoff" }
    ],
    cancel_order: [
      { id: "scriptType", text: "Script Type", tooltip: "Select the script type to narrow down which position you want to cancel; otherwise, all open positions will be canceled" },
      { id: "scriptsearchbox", text: "Script", tooltip: "Choose specific script to cancel only that position; otherwise, all pending orders will be canceled" },
      { id: "productType", text: "Product", tooltip: "Choose specific product to cancel only that position; otherwise, all the open positions will be canceled" }
    ]
  };
  const ids = tooltips[containerId];

  ids.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.style.display = "block";

      let labelB = el.querySelector("b");
      if (labelB) labelB.textContent = item.text;

      // remove old tooltip if exists
      const old = el.querySelector(".extra-info");
      if (old) old.remove();

      // create optional + tooltip
      const wrapper = document.createElement("span");
      wrapper.className = "extra-info ms-2 text-muted fw-normal d-inline-flex align-items-center";

      const opt = document.createElement("span");
      opt.textContent = "(optional)";
      opt.className = "ms-1";

      const info = document.createElement("span");
      info.className = "tooltip-icon ms-1 ";
      info.setAttribute("data-bs-toggle", "tooltip");
      info.setAttribute("title", item.tooltip);
      info.innerHTML = `<i class="bi bi-info-circle"></i>`;

      wrapper.appendChild(opt);
      wrapper.appendChild(info);

      labelB.insertAdjacentElement("afterend", wrapper);
    }
  });

  // activate tooltips
  [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
    .map(el => new bootstrap.Tooltip(el));
}
document.getElementById("productDropdown").addEventListener("change", function () {
  upsertJson("product", this.value, true)
})
