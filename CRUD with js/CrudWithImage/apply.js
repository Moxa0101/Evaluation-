

function show() {
    let form = document.getElementById("staticBackdrop");
    if (form.style.display == "none") {
        form.style.display = "block"
    }
    else {
        form.style.display = "none"
    }
}

renderCarousel();

function clearInputs() {
    document.getElementById("Name").value = "";
    document.getElementById("position").value = "Select your position";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
}

function validateInputs() {
    let description = document.getElementById("description").value.trim();
    let isValid = true;
    if (document.getElementById("Name").value == " " ||
        document.getElementById("position").value == " " ||
        document.getElementById("description").value == "" ||
        document.getElementById("image").value == " ") {
        isValid = false;
        alert("Every field is required");
    }
    if (description.split(/\s+/).length < 10) {
        isValid = false;
        alert("Description must be at least 10 words.");
    }
    if (document.getElementById("position").value == "Select your position") {
        isValid = false;
        alert("Select Valid option");
    }

    return isValid;
}

function addToStorage() {
    if (!validateInputs(true)) return;
    let storageData = JSON.parse(localStorage.getItem("formDetails")) || [];
    let name = document.getElementById("Name").value.trim();
    let Position = document.getElementById("position").value.trim();
    let description = document.getElementById("description").value.trim();
    let image = document.getElementById("image").files[0];
    const reader = new FileReader();
    reader.onload = () => {
        let person = { name, Position, description, image: reader.result };
        storageData.push(person);
        localStorage.setItem('formDetails', JSON.stringify(storageData));
        renderCarousel();
        clearInputs();
    };
    reader.readAsDataURL(image);
}

function renderCarousel() {
    let storageData = JSON.parse(localStorage.getItem("formDetails")) || [];
    let cards = document.getElementById("carouselItems");
    let indicators = document.getElementById("carouselIndicators");
    indicators.innerHTML="";
    cards.innerHTML="";

    storageData.forEach((p, index) => {
        const activeClass = index === 0 ? "active" : "";
        cards.innerHTML += `
        <div class="carousel-item ${activeClass}">
        <div class="desc" data-bs-placement="top"><i class="fas fa-quote-left m-2" style="color:rgb(20,157,221)"></i><span class="desc-text">${p.description}</span><i class="fas fa-quote-right m-2" style="color:rgb(20,157,221)"></i><span class="tooltip">${p.description}</span>
        </div>
        
        <img src="${p.image}" class="profile-img mt-5">
          <h3 id="name" class="mt-2 fw-bold">${p.name}</h3>
          <p id="position" class=" mb-5">${p.Position}</p>
        </div>`;

        indicators.innerHTML += ` <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="${index}" 
        class="${activeClass}" aria-current="${index === 0}" 
        aria-label="Slide ${index + 1}"></button>`;
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === "dark") {
        body.classList.add('darkMode');
    }
    
    themeToggle.addEventListener('click', () => {

        if(document.getElementById("light-Mode").style.display == "none"){
        document.getElementById("light-Mode").style.display="block";
        document.getElementById("dark-Mode").style.display="none";
    }
    else {
        document.getElementById("light-Mode").style.display="none";
        document.getElementById("dark-Mode").style.display="block";
    }
        body.classList.toggle('darkMode');
        if (body.classList.contains('darkMode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});