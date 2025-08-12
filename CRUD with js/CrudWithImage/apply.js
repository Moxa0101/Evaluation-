

function show() {
    let form = document.getElementById("form")
    if (form.style.display == "none") {
        form.style.display = "block"
    }
    else {
        form.style.display = "none"
    }
}

renderCarousel();

function clearInputs() {
    document.getElementById("Name").value = " ";
    document.getElementById("position").value = " ";
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

    storageData.forEach((p, index) => {
        const activeClass = index === 0 ? "active" : "";
        cards.innerHTML += `
        <div class="carousel-item ${activeClass}">
        <div class="desc" data-bs-placement="top"><i class="fas fa-quote-left m-2" style="color:rgb(20,157,221)"></i>${p.description}<i class="fas fa-quote-right m-2" style="color:rgb(20,157,221)"></i></div>
        
        <img src="${p.image}" class="profile-img mt-3">
          <h3 class="mt-2 fw-bold">${p.name}</h3>
          <p class="text-muted">${p.Position}</p>
         
        </div>
        
      `;
    });
}