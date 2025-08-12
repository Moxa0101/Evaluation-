function setActive(obj) {
    document.querySelectorAll('.month_option').forEach(div => div.classList.remove('active'));
    obj.classList.add('active');
}

function increase() {
    let counting = document.getElementsByClassName("counting")[0].value;
    let counter = parseInt(counting) + 1;
    document.getElementsByClassName("counting")[0].value = counter;
    let totalPrice = document.getElementById("totalPriceCtn");
    let pricePerAccount = document.getElementById("priceCtn").innerText;
    let price = pricePerAccount.replace("$", "").split(".")[0];
    let val = parseInt(price) * counter;
    totalPrice.closest('span').innerText = "$" + val + ".00";
    
}

let counter = document.getElementsByClassName("counting")[0];
counter.addEventListener('change', () => {
    if (counter.value <= 0) {
        counter.value = 1;
    }
});

function decrease() {
    let counting = document.getElementsByClassName("counting")[0].value;
    if (counting <= 1) {
        document.getElementsByClassName("counting")[0].disabled = true;
    }
    else {
        let counter = parseInt(counting) - 1;
        document.getElementsByClassName("counting")[0].value = counter;
        let totalPrice = document.getElementById("totalPriceCtn");
        let pricePerAccount = document.getElementById("priceCtn").innerText;
        let price = pricePerAccount.replace("$", "").split(".")[0];
        let val = parseInt(price) * counter;
        totalPrice.closest('span').innerText = "$" + val + ".00";
    }
}


function pricePerAccount(obj) {
    let monthValue = obj.closest("button").value;
    let price = document.getElementById("priceCtn");
    let totalPrice = document.getElementById("totalPriceCtn");
    let val = price.closest('span').innerText;
    let counting = document.getElementsByClassName("counting")[0].value
    if (monthValue == 12) {
        val = (8 * monthValue) - monthValue;
        price.closest('span').innerText = "$" + val + ".00";
        totalPrice.closest('span').innerText = "$" + (val * counting) + ".00";
    }

    else {
        val = 8 * monthValue - (Math.floor(monthValue / 2));
        price.closest('span').innerText = "$" + val + ".00";
        totalPrice.closest('span').innerText = "$" + (val * counting) + ".00";
    }
}

document.getElementById("country_select").addEventListener("change",()=>{
    if(document.getElementById("country_select").value === "US"){
        document.getElementsByClassName("usFlag")[0].style.display="block";
        document.getElementsByClassName("indFlag")[0].style.display="none";
        document.getElementById("pricingUs").style.display='block';
        document.getElementById("pricingInd").style.display='none';
    }
    else{
        document.getElementsByClassName("usFlag")[0].style.display="none";
        document.getElementsByClassName("indFlag")[0].style.display="block";
        document.getElementById("pricingUs").style.display='none';
        document.getElementById("pricingInd").style.display='block';
    }
})

function pricePerAccountInd(obj){
    let monthValue = obj.closest("button").value;
    let price = document.getElementById("priceCtnInd");
    let totalPrice = document.getElementById("totalPriceCtnInd");
    let val = price.closest('span').innerText;
    let counting = document.getElementsByClassName("counting")[0].value
    if (monthValue == 12) {
        val = (680 * monthValue) - parseInt(1020);
        price.closest('span').innerText = "₹" + val + ".00";
        totalPrice.closest('span').innerText = "₹" + (val * counting) + ".00";
    }
    else if (monthValue == 3) {
        val = (680 * monthValue) - parseInt(85);
        price.closest('span').innerText = "₹" + val + ".00";
        totalPrice.closest('span').innerText = "₹" + (val * counting) + ".00";
    }

    else if (monthValue == 6) {
        val = (680 * monthValue) - parseInt(255);
        price.closest('span').innerText = "₹" + val + ".00";
        totalPrice.closest('span').innerText = "₹" + (val * counting) + ".00";
    }

    else {
        val = 680 * monthValue - (Math.floor(monthValue / 2));
        price.closest('span').innerText = "$" + val + ".00";
        totalPrice.closest('span').innerText = "$" + (val * counting) + ".00";
    }
}

function decreaseInd(){
    let counting = document.getElementsByClassName("countingInd")[0].value;
    if (counting <= 1) {
        document.getElementsByClassName("counting")[0].disabled = true;
    }
    else {
        let counter = parseInt(counting) - 1;
        document.getElementsByClassName("countingInd")[0].value = counter;
        let totalPrice = document.getElementById("totalPriceCtnInd");
        let pricePerAccount = document.getElementById("priceCtnInd").innerText;
        let price = pricePerAccount.replace("₹", "").split(".")[0];
        let val = parseInt(price) * counter;
        totalPrice.closest('span').innerText = "₹" + val + ".00";
    }
}

function increaseInd(){
    let counting = document.getElementsByClassName("countingInd")[0].value;
    let counter = parseInt(counting) + 1;
    document.getElementsByClassName("countingInd")[0].value = counter;
    let totalPrice = document.getElementById("totalPriceCtnInd");
    let pricePerAccount = document.getElementById("priceCtnInd").innerText;
    let price = pricePerAccount.replace("₹", "").split(".")[0];
    let val = parseInt(price) * counter;
    totalPrice.closest('span').innerText = "₹" + val + ".00";
}