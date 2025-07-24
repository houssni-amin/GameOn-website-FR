function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const btnCloseModal = document.querySelector(".close")
const inputFirst = document.querySelector("#first")
const errorFirst = document.querySelector(".errorFirst")
const inputLast = document.querySelector("#last")
const errorLast = document.querySelector(".errorLast")
const inputEmail = document.querySelector("#email")
const errorEmail = document.querySelector(".errorEmail")
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const inputQuantity = document.querySelector("#quantity")
const errorQuantity = document.querySelector(".errorQuantity")
const inputBirthdate = document.querySelector("#birthdate")
const errorBirthdate = document.querySelector(".errorBirthdate")
const radioLocations = document.querySelectorAll("input[name=location]")
const errorLocation = document.querySelector(".errorLocation")
const termsChecked = document.querySelector("#checkbox1")
const errorTerms = document.querySelector(".errorTerms")
const confirmationModal = document.querySelector("#confirmationModal")
const closeConfirmation = document.querySelector(".close-confirmation")
const form = document.querySelector("form[name=reserve]")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

btnCloseModal.addEventListener("click", () => {
  modalbg.style.display = "none"
})

closeConfirmation.addEventListener("click", () => {
  confirmationModal.style.display = "none"
})

function validateFirst() {
  if (inputFirst.value.length < 2) {
    errorFirst.style.display = "block"
    return false
  }
  errorFirst.style.display = "none"
  return true
}

function validateLast() {
  if (inputLast.value.length < 2) {
    errorLast.style.display = "block"
    return false
  }
  errorLast.style.display = "none"
  return true
}

function validateEmail() {
  if (!emailRegex.test(inputEmail.value)) {
    errorEmail.style.display = "block"
    return false
  }
  errorEmail.style.display = "none"
  return true
}

function validateBirthdate() {
  if (inputBirthdate.value === "") {
    errorBirthdate.style.display = "block"
    return false
  }
  errorBirthdate.style.display = "none"
  return true
}

function validateQuantity() {
  if (inputQuantity.value === "") {
    errorQuantity.style.display = "block"
    return false
  }
  errorQuantity.style.display = "none"
  return true
}

function validateLocation() {
  let radioChecked = false
  radioLocations.forEach((radio) => {
    if (radio.checked) {
      radioChecked = true
    }
  })

  if (!radioChecked) {
    errorLocation.style.display = "block"
    return false
  }
  errorLocation.style.display = "none"
  return true
}

function validateTerms() {
  if (!termsChecked.checked) {
    errorTerms.style.display = "block"
    return false
  }
  errorTerms.style.display = "none"
  return true
}

function validate() {
  const isFirstValid = validateFirst()
  const isLastValid = validateLast()
  const isEmailValid = validateEmail()
  const isBirthdateValid = validateBirthdate()
  const isQuantityValid = validateQuantity()
  const isLocationValid = validateLocation()
  const isTermsValid = validateTerms()

  const isValid =
    isFirstValid &&
    isLastValid &&
    isEmailValid &&
    isBirthdateValid &&
    isQuantityValid &&
    isLocationValid &&
    isTermsValid

  if (isValid) {
    modalbg.style.display = "none"
    confirmationModal.style.display = "block"
    form.reset()
    return false
  }

  return false
}
