
function show() {
  const form = document.getElementById("formContainer");
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
    else if (cellValue > 18 && cellValue < 51) {
      cell.style.backgroundColor = "purple";
      cell.style.color = "white";
    }
    else if (cellValue > 50) {
      cell.style.backgroundColor = "red";
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

function addTableDataToStorage() {
  if (!validateInputs(true)) return;
  const table_data = JSON.parse(localStorage.getItem('tabledata'));
  let data_id = table_data?.length ? (table_data.length) + 1 : 1;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  let tableData = [];
  table_data === null ? tableData = [] : tableData = JSON.parse(localStorage.getItem('tabledata'));
  tableData.push({ Id: data_id, Name: name, Age: age, State: state, City: city });
  localStorage.setItem('tabledata', JSON.stringify(tableData));
  clearInputs();
  let pagesPerShow = document.getElementById("pagesToShow").value;
  let lastPage = Math.ceil(Data.length / pagesPerShow);
  gotoPage(lastPage);
  let tbody = document.querySelector("#outputTable tbody");
  let newRow = tbody.insertRow();
  newRow.insertCell(0).innerHTML = data_id;
  newRow.insertCell(1).innerHTML = name;
  newRow.insertCell(2).innerHTML = age;
  newRow.insertCell(3).innerHTML = state;
  newRow.insertCell(4).innerHTML = city;
  newRow.insertCell(5).innerHTML = `<button id='row_${data_id}' onClick=takeToEdit(this)>edit</button><button id='row_${data_id}' onClick=deleteData(this)>delete</button>`;
  addBgcolorToAge();
}

let edit_btn_obj = null;
function takeToEdit(obj) {
  document.getElementById("edit_section").style.display = "block";
  document.getElementById("addData").style.display = "none";
  const data = obj.closest("tr").cells;
  edit_btn_obj = obj;
  const name = data[1].innerHTML;
  const age = data[2].innerHTML;
  const state = data[3].innerHTML;
  const city = data[4].innerHTML;
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("state").value = state;
  document.getElementById("city").value = city;
  show();
  addTableDataToStorage();
}

function deleteData(obj) {
  obj.closest("tr").remove();
  let storedData = JSON.parse(localStorage.getItem('tabledata'));
  const id = obj.closest("tr").cells[0].innerText;
  storedData = storedData.filter(Data => Data.Id != id);
  storedData = storedData.map((Data, index) => {
    Data.Id = index + 1;
    return Data;
  });
  localStorage.setItem('tabledata', JSON.stringify(storedData));
  Data = storedData;
  const pagesPerShow = document.getElementById("pagesToShow").value;
  showTable(pagesPerShow);
  pagination(pagesPerShow);
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
}


function performEdit() {

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  cells = edit_btn_obj.closest("tr").cells;
  cells[1].innerHTML = name;
  cells[2].innerHTML = age;
  cells[3].innerHTML = state;
  cells[4].innerHTML = city;
  document.getElementById("edit_section").style.display = "none";
  document.getElementById("addData").style.display = "block";

  let storedData = JSON.parse(localStorage.getItem("tabledata"));
  let editedId = cells[0].textContent;
  storedData = storedData.map(row => {
    if (row[0] == editedId) {
      row[1] = name;
      row[2] = age;
      row[3] = state;
      row[4] = city;
    }
    return row;
  });
  localStorage.setItem("tabledata", JSON.stringify(storedData));
  clearInputs();

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


document.getElementById('pagesToShow').addEventListener("change", function () {
  let pagesPerShow = this.value;
  gotoPage(1);
  showTable(pagesPerShow);
  pagination(pagesPerShow);
})

let Data = JSON.parse(localStorage.getItem("tabledata"));
let currentPage = 1;

function showTable(pagesPerShow) {
  const startIndex = (currentPage - 1) * pagesPerShow;
  const endIndex = startIndex + parseInt(pagesPerShow);
  const paginatedData = Data.slice(startIndex, endIndex);
  let tableToShow = `<thead><tr><th>id</th>
  <th>Name <span class="arrow" onclick="sortTable(1, this); " data-order="asc">&#9650;</span> </th>
  <th>Age <span class="arrow" onclick="sortTable(2, this); " data-order="asc">&#9650;</span></th>
  <th>State <span class="arrow" onclick="sortTable(3, this); " data-order="asc">&#9650;</span></th>
  <th>City <span class="arrow" onclick="sortTable(4, this); " data-order="asc">&#9650;</span></th>
  <th>Action</th></thead>`
  paginatedData.forEach((row) => {
    tableToShow += `<tr>
      <td>${row.Id}</td>
      <td>${row.Name}</td>
      <td>${row.Age}</td>
      <td>${row.State}</td>
      <td>${row.City}</td>
      <td><button onclick="takeToEdit(this)">Edit</button>
      <button onclick="deleteData(this)">Delete</button>
      </td></tr>`
  });
  document.getElementById("outputTable").innerHTML = tableToShow;
  addBgcolorToAge();
}

function pagination(pagesPerShow) {
  let footer = document.getElementById("footer");
  footer.innerHTML = "";
  let totalPages = Math.ceil((Data.length) / pagesPerShow);
  footer.innerHTML += `<button onclick="gotoPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    footer.innerHTML += `<button onclick="gotoPage(${i})" ${i === currentPage ? "class='activePage'" : ''}>${i}</button>`;
  }
  footer.innerHTML += `<button onclick="gotoPage(${currentPage + 1})"${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
}


function gotoPage(page) {
  currentPage = page;
  const pagesPerShow = document.getElementById("pagesToShow").value;
  showTable(pagesPerShow);
  pagination(pagesPerShow);
}


showTable(10);
pagination(10);










