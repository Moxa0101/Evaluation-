
function show() {
    var form = document.getElementById("formContainer");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

const table = document.getElementById("outputTable");



function addBgcolorToAge() {
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows;
        const cell = row[i].cells[2];
        const cellValue = cell?.innerHTML;
        if (cellValue <= 18) {
            cell.style.backgroundColor = "orange";
            cell.style.color = "white";
        }
        else if (cellValue > 18 && cellValue < 65) {
            cell.style.backgroundColor = "purple";
            cell.style.color = "white";
        }
        else if (cellValue > 64) {
            cell.style.backgroundColor = "green";
            cell.style.color = "white";
        }
    }
}


const citiesByState = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat", "Ziro", "Bomdila"],
    "Assam": ["Guwahati", "Dispur", "Tezpur", "Dibrugarh", "Jorhat", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Bihar Sharif", "Darbhanga", "Bhagalpur", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Bhilai", "Rajnandgaon"],
    "Goa": ["Panaji", "Vasco da Gama", "Margao", "Ponda", "Mapusa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Anand"],
    "Haryana": ["Chandigarh", "Gurugram", "Faridabad", "Sonipat", "Panipat", "Ambala", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Chamba", "Bilaspur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli-Dharwad", "Belagavi", "Davangere"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Solapur"],
    "Manipur": ["Imphal", "Bishnupur", "Ukhrul", "Chandel", "Tamenglong"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Cherrapunji", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Tuipang"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Kapurthala"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Bikaner", "Ajmer", "Jaisalmer"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Ravangla"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Erode", "Vellore"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Adilabad"],
    "Tripura": ["Agartala", "Amarpur", "Kumarghat", "Udaipur", "Kunjaban"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Noida", "Ghaziabad"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Rishikesh", "Haldwani", "Kashipur"],
    "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Asansol", "Durgapur"],
    "Delhi (NCT)": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Saket"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Baramulla", "Anantnag", "Udhampur"],
    "Ladakh": ["Leh", "Kargil"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Chandigarh": ["Chandigarh"]
};

document.addEventListener('DOMContentLoaded', function () {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    for (const state in citiesByState) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }

    stateSelect.addEventListener('change', function () {
        const selectedState = this.value;

        citySelect.innerHTML = '<option value="">Select City</option>';

        if (selectedState) {
            const cities = citiesByState[selectedState];
            if (cities) {
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        }
    });
});

const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const submitBtn = document.getElementById("addData");

function validateInputs() {
    let isValid = true;
    let errorMessage = "";
    let namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    if (nameInput.value.trim() === '') {
        errorMessage += "Enter valid name.\n";
        isValid = false;
    }

    if (!namePattern.test(nameInput.value.trim())) {
        errorMessage += "Enter full  name.\n";
        isValid = false;
    }

    const age = parseInt(ageInput.value);
    if (!age || age < 1 || age > 120) {
        errorMessage += 'age is invalid. \n';
        isValid = false;
    }
    if (stateSelect.value === '') {
        errorMessage += 'State select is required. \n';
        isValid = false;
    }

    if (citySelect.value === '') {
        errorMessage += 'City select is required \n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

const table_data = JSON.parse(localStorage.getItem('tabledata'));

function addTableDataToStorage() {
    let tableData = [];

    table_data === null ? tableData = [] : tableData = JSON.parse(localStorage.getItem('tabledata'));
    const rows = table.querySelectorAll('tbody tr');
    const duplicateId = tableData.map(row => String(row[0]).trim());
    rows.forEach(row => {
        const rowData = {}; // Or an empty array if you prefer an array of arrays
        const cells = row.querySelectorAll('td');
        console.log(rowData);
        cells.forEach((cell, index) => {
            rowData[index] = cell.textContent.trim();
        });

        console.log(tableData);

        const rowId = String(rowData[0]).trim();
        if (!duplicateId.includes(rowId)) {
            tableData.push(rowData);
        }
    });

    localStorage.setItem('tabledata', JSON.stringify(tableData));
}


function storageToTable() {
    const tbody = document.querySelector('tbody');
    const table_data = JSON.parse(localStorage.getItem('tabledata'));
    tbody.innerHTML = '';
    for (row of table_data) {
        if (row[0]) {
            let newRow = tbody.insertRow();
            newRow.insertCell(0).innerHTML = row[0];
            newRow.insertCell(1).innerHTML = row[1];
            newRow.insertCell(2).innerHTML = row[2];
            newRow.insertCell(3).innerHTML = row[3];
            newRow.insertCell(4).innerHTML = row[4];
            newRow.insertCell(5).innerHTML = `<button id='row_${row[0]}' onClick=takeToModal(this); performEdit(this);>edit</button><button id='row_${row[0]}' onClick=deleteData(this)>delete</button>`;
            addBgcolorToAge();
        }
    }
}

storageToTable();


function addDataToTable() {
    if (!validateInputs(true)) return;
    let current_table_data = JSON.parse(localStorage.getItem('tabledata'));
    let data_id = current_table_data?.length ? (current_table_data.length) + 1 : 1;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    let tbody = document.querySelector("#outputTable tbody");
    let newRow = tbody.insertRow();
    newRow.insertCell(0).innerHTML = data_id;
    newRow.insertCell(1).innerHTML = name;
    newRow.insertCell(2).innerHTML = age;
    newRow.insertCell(3).innerHTML = state;
    newRow.insertCell(4).innerHTML = city;
    newRow.insertCell(5).innerHTML = `<button id='row_${data_id}' onClick=takeToModal(this)>edit</button><button id='row_${data_id}' onClick=deleteData(this)>delete</button>`;
    clearInputs();
    addTableDataToStorage();
    addBgcolorToAge();
}


let currentRow = null;

function takeToModal(obj) {
    $('#ModalToEdit').modal('show');
    const data = obj.closest("tr").cells;
    currentRow = obj.closest("tr");
    const name = data[1].innerHTML;
    const age = data[2].innerHTML;
    const state = data[3].innerHTML;
    const city = data[4].innerHTML;
    document.getElementById("EditName").value = name;
    document.getElementById("EditAge").value = age;
    populateDropdown('EditState', citiesByState);
    document.getElementById("EditState").value = state;
    populateCities(document.getElementById("EditState").value, 'EditCity');
    document.getElementById("EditCity").value = city;


}

function populateDropdown(selectId, data) {
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">-- Select an option --</option>';
    for (const key in data) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        select.appendChild(option);
    }
}
function populateCities(state, selectId) {
    const citySelect = document.getElementById(selectId);
    citySelect.innerHTML = '<option value="">-- Select an option --</option>';
    if (citiesByState[state]) {
        citiesByState[state].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}




function validateModalInputs() {
    const EditnameInput = document.getElementById("EditName");
    const EditageInput = document.getElementById("EditAge");
    const EditstateSelect = document.getElementById("Editstate");
    const EditcitySelect = document.getElementById("EditCity");
    let isValid = true;
    let errorMessage = "";
    let namePattern = /^[a-zA-Z]+(?: [a-zA-Z]+)+$/;
    if (EditnameInput.value.trim() === '') {
        errorMessage += "Enter valid name.\n";
        isValid = false;
    }

    if (!namePattern.test(EditnameInput.value.trim())) {
        errorMessage += "Enter full  name.\n";
        isValid = false;
    }

    const age = parseInt(EditageInput.value);
    if (!age || age < 1 || age > 120) {
        errorMessage += 'age is invalid. \n';
        isValid = false;
    }
    if (EditstateSelect?.value === '') {
        errorMessage += 'State select is required. \n';
        isValid = false;
    }

    if (EditcitySelect?.value === '') {
        errorMessage += 'City select is required \n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

function performEdit() {
    if (!validateModalInputs(true)) return;
    const name = document.getElementById("EditName").value;
    const age = document.getElementById("EditAge").value;
    const state = document.getElementById("EditState").value;
    const city = document.getElementById("EditCity").value;
    if (currentRow) {
        currentRow.cells[1].innerText = name;
        currentRow.cells[2].innerText = age;
        currentRow.cells[3].innerText = state;
        currentRow.cells[4].innerText = city;

        const editedId = currentRow.cells[0].innerText;

        let storedData = JSON.parse(localStorage.getItem("tabledata"));
        storedData = storedData.map(row => {
            if (row[0] == editedId) {
                return [editedId, name, age, state, city];
            }
            return row;
        });

        localStorage.setItem("tabledata", JSON.stringify(storedData));
    }

    $('#ModalToEdit').modal('hide');
    addBgcolorToAge();
}


function deleteData(obj) {
    obj.closest("tr").remove();
    let storedData = JSON.parse(localStorage.getItem('tabledata'));
    const id = obj.closest("tr").cells[0].innerText;
    storedData = storedData.filter(row => row[0] != id);
    storedData = storedData.map((row, index) => {
        row[0] = index + 1;
        return row;
    });
    localStorage.setItem('tabledata', JSON.stringify(storedData));
    window.location.reload();
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
}





function cancelDataUpdate() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("edit_section").style.display = "none";
    document.getElementById("addData").style.display = "block";
}

let sortDirections = {};
function sortTable(colIndex, arrowEl) {
    const tbody = table.querySelector(" tbody");
    const rows = Array.from(tbody.rows);

    sortDirections[colIndex] = !sortDirections[colIndex];

    rows.sort((a, b) => {
        let valA = a.cells[colIndex].textContent.trim();
        let valB = b.cells[colIndex].textContent.trim();

        if (!isNaN(valA) && !isNaN(valB)) {
            valA = +valA;
            valB = +valB;
        }

        return sortDirections[colIndex]
            ? valA > valB ? 1 : -1
            : valA < valB ? 1 : -1;
    });

    rows.forEach(row => tbody.appendChild(row));
    updateArrowIcons(colIndex, arrowEl);
    addBgcolorToAge();

}

function updateArrowIcons(activeIndex, activeArrow) {
    const allArrows = document.querySelectorAll("th .arrow");
    allArrows.forEach(arrow => {
        arrow.innerHTML = "&#9650;"; // default to up arrow
    });

    activeArrow.innerHTML = sortDirections[activeIndex] ? "&#9650;" : "&#9660;";
}
