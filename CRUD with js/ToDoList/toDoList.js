
//this function validates input
let Data = JSON.parse(localStorage.getItem('toDo'));
function validateInputs() {
    let isValid = true;

    let storedData = JSON.parse(localStorage.getItem('toDo'));
    let task = document.getElementById('taskadder').value.trim();
    if (task == "") {
        isValid = false;
        alert("enter something");
    }

    for (let i = 0; i < storedData?.length; i++) {
        if (task == storedData[i].Tasks) {
            alert("task already exists");
            isValid = false;
            clearInputs();
        }
    }
    return isValid;
}

//this function adds  data from addToDo text box to screen as well as storage
document.getElementById('taskAddbtn').onclick = () => {
    if (!validateInputs(true)) return;
    let Data = JSON.parse(localStorage.getItem('toDo'));
    let task = document.getElementById('taskadder').value;

    Data == null ? Data = [] : Data = JSON.parse(localStorage.getItem('toDo'));
    Data.push({ Tasks: task, isCompleted: "false" });
    localStorage.setItem('toDo', JSON.stringify(Data));
    clearInputs();

    let lastPage = Math.ceil(Data.length / 6);
    gotopagelast(lastPage);

}

// this adds card to screen
function DataAdd() {
    let Data = JSON.parse(localStorage.getItem('toDo'));
    //console.log(Data)
    //console.log(currentPage)
    let startIndex = 6 * (currentPage - 1);
    let endIndex = startIndex + 6;
    let toDoList = document.getElementById('multiplecardholder');
    toDoList.innerHTML = "";
    for (let i = startIndex; i < endIndex; i++) {
        let completedTask = Data[i].isCompleted === "true" ? 'complete' : "";
        let showDone = Data[i].isCompleted === "true" ? "" : `<button class="btn btn-primary" onclick="markAsDone(this)">Done</button>`;
        toDoList.innerHTML += `<div  class="col-md-4 col-sm-12 mb-3"><div class="card"><div class="card-body ${completedTask}"  data-task="${Data[i].Tasks}"><div class="trunacated-text" }">${Data[i].Tasks}<span class="tooltip">${Data[i].Tasks}</span> </div><span id="buttonHolder"> <button class="btn btn-danger" onclick="deleteData(this)">Delete</button>${showDone}</span></div></div></div>`
        pagination(Data);
    }
}
//this chooses last div to add new card
function gotopagelast(page) {
    currentPage = page;
    DataAdd();
}

let currentPage = 1;
let currentData = [];


//this shows cards on user request accordingly the things choosen
function cardsToShow(data = null) {
    let Data = data || JSON.parse(localStorage.getItem('toDo'));
    currentData = Data;
    let toDoList = document.getElementById('multiplecardholder');
    console.log(currentData)
    let startIndex = 6 * (currentPage - 1);
    let endIndex = startIndex + 6;

    toDoList.innerHTML = "";
    for (let i = startIndex; i < endIndex; i++) {
        let completedTask = Data[i].isCompleted === "true" ? 'complete' : "";
        let showDone = Data[i].isCompleted === "true" ? "" : `<button class="btn btn-primary" onclick="markAsDone(this)">Done</button>`;
        toDoList.innerHTML += `<div  class="col-md-4 col-sm-12 mb-3"><div class="card"><div class="card-body ${completedTask}"  data-task="${Data[i].Tasks}"><div class="trunacated-text" }">${Data[i].Tasks}<span class="tooltip">${Data[i].Tasks}</span> </div><span id="buttonHolder"> <button class="btn btn-danger" onclick="deleteData(this)">Delete</button>${showDone}</span></div></div></div>`
        pagination(Data);
    }

}

//gives pages according to card choosen from cardToShow() function
function pagination(data = null) {
    let Data = data || JSON.parse(localStorage.getItem('toDo'));
    let totalPages = Math.ceil(Data.length / 6);
    let footer = document.getElementById('footer');
    footer.innerHTML = "";
    footer.innerHTML += `<button class="btn btn-primary" onclick="gotoPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>`;
    for (let i = 1; i <= totalPages; i++) {
        footer.innerHTML += `<button class="btn btn-primary" onclick="gotoPage(${i})" ${i === currentPage ? 'style="Background-color:rgba(0, 7, 221, 1)";' : ''}>${i}</button>`;
    }
    footer.innerHTML += `<button class="btn btn-primary" onclick="gotoPage(${currentPage + 1})"${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
}

//this fetches the page according to btn you clicked from prev/next/page count numbers
function gotoPage(page) {
    currentPage = page;
    cardsToShow(currentData);
}

//clears the text box
function clearInputs() {
    document.getElementById('taskadder').value = "";
}

//Deletebutton function
function deleteData(obj) {
    let storedData = JSON.parse(localStorage.getItem('toDo')) || [];
    let task = obj.closest('.card-body').dataset.task;
    if (confirm('Do you want to delete this task??')) {
        let finalData = storedData.filter(storedData => storedData.Tasks != task);
        localStorage.setItem('toDo', JSON.stringify(finalData));
    }
    showTask(document.getElementById('dropdown').value)
}


//Done button function
function markAsDone(obj) {
    if (!confirm('is your task done??')) return;
    let storedData = JSON.parse(localStorage.getItem('toDo'));
    let completedWork = obj.closest('.card-body').dataset.task;
    for (let i = 0; i < storedData.length; i++) {
        if (storedData[i].Tasks === completedWork) {
            storedData[i].isCompleted = "true";
        }
    }
    localStorage.setItem('toDo', JSON.stringify(storedData));
    btnDisable();
    showTask(document.getElementById('dropdown').value);
}





//search box which shows data acoording to search and field choosen from dropdown
function searchData() {
    let search = document.getElementById('search').value;
    if (search !== "") {
        let toDoList = document.getElementById('multiplecardholder');
        let whatToShow = document.getElementById('dropdown').value;
        let storedData = JSON.parse(localStorage.getItem('toDo'));;
        if (whatToShow == "Pending") {
            storedData = storedData.filter(storedData => storedData.isCompleted !== "true");
        }
        else if (whatToShow == "Completed") {
            storedData = storedData.filter(storedData => storedData.isCompleted === "true");
        }
        else {
            storedData = storedData;
        }
        let searchedData = storedData.filter(storedData => storedData.Tasks == search || storedData.Tasks.toLowerCase() == search || storedData.Tasks.substring(0, search.length) == search);
        if (searchedData == "") {
            toDoList.innerHTML = `<h3>No ${whatToShow} data like you searched</h3>`
            let footer = document.getElementById('footer');
            footer.innerHTML = "";

        }
        else {
            currentPage = 1;
            cardsToShow(searchedData);
        }
    }

    
    //this reacts to changes in the search box
    document.getElementById("search").addEventListener('input', () => {
        let toDoList = document.getElementById('multiplecardholder');
        let search = document.getElementById('search').value;
        let whatToShow = document.getElementById('dropdown').value;
        let storedData = JSON.parse(localStorage.getItem('toDo'));;
        if (whatToShow == "Pending") {
            storedData = storedData.filter(storedData => storedData.isCompleted !== "true");
        }
        else if (whatToShow == "Completed") {
            storedData = storedData.filter(storedData => storedData.isCompleted === "true");
        }
        else {
            storedData = storedData;
        }
        let searchedData = storedData.filter(storedData => storedData.Tasks == search || storedData.Tasks.toLowerCase() == search || storedData.Tasks.substring(0, search.length) == search);
        if (searchedData == "") {
            toDoList.innerHTML = `<h3>No ${whatToShow} data like you searched</h3>`
            let footer = document.getElementById('footer');
            footer.innerHTML = "";

        }
        else {
            currentPage = 1;
            cardsToShow(searchedData);
        }
    })
}


//dropdown change function
document.getElementById("dropdown").addEventListener("change", () => {
    let whatToShow = document.getElementById("dropdown").value;
    showTask(whatToShow);
    searchData();

})

//this shows the task according to dropdown selection
function showTask(whatToShow) {
    let storedData = JSON.parse(localStorage.getItem("toDo"));
    let toDoList = document.getElementById('multiplecardholder');
    toDoList.innerHTML = "";
    let filteredData = [];

    if (whatToShow == "Pending") {
        filteredData = storedData.filter(storedData => storedData.isCompleted !== "true");
    }
    else if (whatToShow == "Completed") {
        filteredData = storedData.filter(storedData => storedData.isCompleted === "true");
    }
    else {
        filteredData = storedData;
    }

    if (filteredData == "") {
        toDoList.innerHTML = `<h3>No ${whatToShow} data like this!!</h3>`
        let footer = document.getElementById('footer');
        footer.innerHTML = "";
    }
    else {
        cardsToShow(filteredData);
    }
}

//clear all completed button function
document.getElementById("clearcomplete").onclick = () => {
    if (!confirm("are you sure you want to remove all the completed task??")) return;
    let storedData = JSON.parse(localStorage.getItem('toDo'));
    let toDoList = document.getElementById('multiplecardholder');
    toDoList.innerHTML = "";
    let finalData = storedData.filter(obj => obj.isCompleted == "false");
    localStorage.setItem('toDo', JSON.stringify(finalData));
    for (let i = 0; i < finalData.length; i++) {
        toDoList.innerHTML += `<div  class=" col-md-4 col-sm-12 mb-3"><div class="card"><div class="card-body"><div class="trunacated-text">${finalData[i].Tasks}</div><span id="buttonHolder"><button class="btn btn-danger" onclick="deleteData(this)">Delete</button><button class="btn btn-primary" onclick="markAsDone(this)">Done</button></span></div></div></div>`
    }
    showTask(document.getElementById('dropdown').value);
    btnDisable();
}
showTask('All');

//function to disable and enable the clear all complete btn
function btnDisable() {
    let storedData = JSON.parse(localStorage.getItem('toDo'));
    let dataCompleted = storedData.filter(obj => obj.isCompleted == "true");
    console.log(dataCompleted)
    if (dataCompleted == "") {
        console.log(dataCompleted)
        document.getElementById('clearcomplete').disabled = true;
    }
    else {
        document.getElementById('clearcomplete').disabled = false;

    }
}
btnDisable();