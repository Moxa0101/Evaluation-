function changePlaceholder(obj) {
    obj.placeholder = "Enter your Mobile no.";
}

function resetPlaceholder(obj) {
    if (!obj.value) {
        obj.placeholder = "Mobile no."
    }
}

function changePasswordPlaceholder(obj) {
    obj.placeholder = "Enter your password";
}

function resetPasswordPlaceholder(obj) {
    if (!obj.value) {
        obj.placeholder = "Password"
    }
}


function confirmNewPasswordPlaceholder(obj) {
    obj.placeholder = "Re-enter password"
}

function resetconfirmNewPasswordPlaceholder(obj) {
    if (!obj.value) {
        obj.placeholder = "Confirm Password"
    }
}

function NewPasswordPlaceholder(obj) {
    obj.placeholder = "Enter new password"
}

function resetNewPasswordPlaceholder(obj) {
    if (!obj.value) {
        obj.placeholder = "New Password"
    }
}

function refferalIdPlaceholder(obj) {
    obj.placeholder = "Enter Refferal Id"
}

function resetIdPlaceholder(obj) {
    if (!obj.value) {
        obj.placeholder = "Referral Id(Optional)"
    }
}

const passwordField = document.getElementById('passwordField');
const togglePassword = document.getElementById('togglePassword');

togglePassword?.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});

const newpasswordField = document.getElementById('newpasswordField');
const newtogglePassword = document.getElementById('newtogglePassword');

newtogglePassword?.addEventListener('click', function () {
    const type = newpasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    newpasswordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});

const confirmpasswordField = document.getElementById('confirmpasswordField');
const confirmtogglePassword = document.getElementById('confirmtogglePassword');

confirmtogglePassword?.addEventListener('click', function () {
    const type = confirmpasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmpasswordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});

function validateLogin() {
    let isValid = true;
    let errorMessage = "";
    const mobileNumber = document.getElementById("Mo-number");
    const setpassword = document.getElementById("setPassword");

    let numberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!numberPattern.test(mobileNumber?.value.trim())) {
        errorMessage += "Enter valid 10 digit Mobile-No..\n";
        isValid = false;
    }

    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8}$/;;
    if (!passwordPattern.test(setpassword?.value.trim())) {
        errorMessage += "password must containe 8 character and 1 special and 1 capital character\n";
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;
}

function validateForgetPassword() {
    let isValid = true;
    let errorMessage = "";
    const mobileNumber = document.getElementById("Mo-number");
    const newpassword = document.getElementById("newpasswordField");
    const confirmpassword = document.getElementById("confirmpasswordField");

    let numberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!numberPattern.test(mobileNumber?.value.trim())) {
        errorMessage += "Enter valid 10 digit Mobile-No..\n";
        isValid = false;
    }

    if (newpassword?.value.trim() === "" && confirmpassword?.value.trim() === "") {
        errorMessage += "enter something";
        isValid = false;
    }
    if ((newpassword?.value.trim() !== confirmpassword?.value.trim())) {
        errorMessage += "new password and congirm password must be same";
        isValid = false;
    }

    
    

    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;

}

function validateRegistration(){
    let isValid = true;
    let errorMessage = "";
    const mobileNumber = document.getElementById("Mo-number");
    const referralId = document.getElementById("referralId");
    const isChecked=document.getElementById("checkDefault").checked;
     let numberPattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!numberPattern.test(mobileNumber?.value.trim())) {
        errorMessage += "Enter valid 10 digit Mobile-No..\n";
        isValid = false;
    }
    let codepattern = /^\d*$/;
    if (referralId?.value.trim() && !codepattern.test(referralId?.value.trim())) {
        errorMessage += "referral Id must be numeric";
        isValid = false;
    }
    if (!isChecked) {
        errorMessage += "You must agree to terms.\n";
        isValid = false;
    }
    if (!isValid) {
        alert(errorMessage);
    }
    return isValid;

}

window.addEventListener("DOMContentLoaded", () => {
    const queryString=window.location.search;
    const urlParams=new URLSearchParams(queryString);
    const referral=urlParams.get("referral");
    if (referral) {
        const referralInput = document.getElementById("referralId");
        referralInput.value = referral;
        referralInput.disabled = true; 
    }
});
