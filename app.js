const upperset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "~!@#$%^&*()_+/";

const passBox = document.querySelector("#pass-box");
const totalChar = document.querySelector("#total-char");
const upperInput = document.querySelector("#upper-case");
const lowerInput = document.querySelector("#lower-case");
const numberInput = document.querySelector("#numbers");
const symbolInput = document.querySelector("#symbols");
const btn = document.querySelector("#btn");
const strengthBar = document.querySelector("#strength-bar");
const copyBtn = document.querySelector("#copy-btn");
const themeToggleBtn = document.querySelector("#theme-toggle");

const getRandomData = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
}

const updateStrength = (password) => {
    let strength = "Weak";
    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
        strength = "Medium";
    }
    if (password.length > 12 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
        strength = "Strong";
    }
    strengthBar.innerText = `Strength: ${strength}`;
    
    // Update the background color or progress
    if (strength === "Weak") {
        strengthBar.style.backgroundColor = "red";
    } else if (strength === "Medium") {
        strengthBar.style.backgroundColor = "yellow";
    } else {
        strengthBar.style.backgroundColor = "green";
    }
};

const generatePassword = (password = "") => {
    if (upperInput.checked) password += getRandomData(upperset);
    if (lowerInput.checked) password += getRandomData(lowerSet);
    if (numberInput.checked) password += getRandomData(numberSet);
    if (symbolInput.checked) password += getRandomData(symbolSet);

    if (password.length < totalChar.value) {
        return generatePassword(password);
    }

    passBox.innerText = password.substring(0, totalChar.value);
    updateStrength(passBox.innerText);
}

btn.addEventListener("click", () => {
    generatePassword();
});

copyBtn.addEventListener("click", () => {
    const password = passBox.innerText;
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    });
});

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});
