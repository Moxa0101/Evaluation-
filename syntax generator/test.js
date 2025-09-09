// ====== Cache DOM elements ======
const strategyDropdown = document.getElementById("strategyDropdown");
const productDropdown1 = document.getElementById("productDropdown1"); // first dropdown
const productDropdown2 = document.getElementById("productDropdown2"); // second dropdown
const premiumField = document.getElementById("premiumField");
const expiryGapField = document.getElementById("expiryGapField");
const switches = document.querySelectorAll(".switch"); // example for switch toggles
const buttons = document.querySelectorAll(".actionBtn"); // any onclick buttons

// ====== Utility functions ======
function toggleField(field, show) {
    if (!field) return;
    field.style.display = show ? "block" : "none";
    if (!show) field.value = ""; // reset hidden field
}

function attachInputSafely(field, callback) {
    if (!field) return;
    // remove old listeners
    field.replaceWith(field.cloneNode(true));
    const newField = document.getElementById(field.id);
    newField.addEventListener("input", () => {
        if (newField.style.display === "none") return;
        callback(newField.value);
    });
}

function attachChangeSafely(field, callback) {
    if (!field) return;
    field.replaceWith(field.cloneNode(true));
    const newField = document.getElementById(field.id);
    newField.addEventListener("change", () => {
        if (newField.style.display === "none") return;
        callback(newField.value);
    });
}

function attachClickSafely(button, callback) {
    if (!button) return;
    button.replaceWith(button.cloneNode(true));
    const newBtn = document.getElementById(button.id);
    newBtn.addEventListener("click", callback);
}

function attachSwitchSafely(switchEl, callback) {
    if (!switchEl) return;
    switchEl.replaceWith(switchEl.cloneNode(true));
    const newSwitch = document.getElementById(switchEl.id);
    newSwitch.addEventListener("change", () => {
        if (newSwitch.style.display === "none") return;
        callback(newSwitch.checked);
    });
}

// ====== Strategy Handlers ======
function handleLimitOrder() {
    // show fields in order: Expiry Gap → Premium → 2 Dropdowns
    toggleField(expiryGapField, true);
    toggleField(premiumField, true);
    toggleField(productDropdown1, true);
    toggleField(productDropdown2, true);
}

function handleCEOrder() {
    toggleField(expiryGapField, true);
    toggleField(premiumField, false);
    toggleField(productDropdown1, true);
    toggleField(productDropdown2, true);
}

function handlePEOrder() {
    toggleField(expiryGapField, true);
    toggleField(premiumField, false);
    toggleField(productDropdown1, true);
    toggleField(productDropdown2, true);
}

// Add more strategy types here if needed

// ====== Main strategy switch ======
function strategyOrderHandler(type) {
    // Hide all first
    [expiryGapField, premiumField, productDropdown1, productDropdown2].forEach(f => toggleField(f, false));

    // Run only relevant handler
    if (type === "limit") handleLimitOrder();
    else if (type === "CE") handleCEOrder();
    else if (type === "PE") handlePEOrder();
}

// ====== Event Listeners ======
strategyDropdown.addEventListener("change", (e) => {
    const type = e.target.value;
    strategyOrderHandler(type);
});

// Attach input/change/click/switch safely
attachInputSafely(premiumField, val => console.log("Premium:", val));
attachInputSafely(expiryGapField, val => console.log("Expiry Gap:", val));
attachChangeSafely(productDropdown1, val => console.log("Product 1:", val));
attachChangeSafely(productDropdown2, val => console.log("Product 2:", val));

switches.forEach(sw => attachSwitchSafely(sw, val => console.log(sw.id, "checked:", val)));
buttons.forEach(btn => attachClickSafely(btn, () => console.log(btn.id, "clicked")));
