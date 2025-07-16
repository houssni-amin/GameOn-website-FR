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
const formData = document.querySelectorAll(".formData")
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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

btnCloseModal.addEventListener("click", () => {
  modalbg.style.display = "none"
})

function validate() {
  let isValid = true

  if (inputFirst.value.length < 2) {
    isValid = false
    errorFirst.style.display = "block"
  } else {
    errorFirst.style.display = "none"
  }

  if (inputLast.value.length < 2) {
    isValid = false
    errorLast.style.display = "block"
  } else {
    errorLast.style.display = "none"
  }

  if (!emailRegex.test(inputEmail.value)) {
    isValid = false
    errorEmail.style.display = "block"
  } else {
    errorEmail.style.display = "none"
  }

  if (inputBirthdate.value === "") {
    isValid = false
    errorBirthdate.style.display = "block"
  } else {
    errorBirthdate.style.display = "none"
  }

  if (inputQuantity.value === "") {
    isValid = false
    errorQuantity.style.display = "block"
  } else {
    errorQuantity.style.display = "none"
  }

  let radioChecked = false
  radioLocations.forEach((radio) => {
    if (radio.checked) {
      radioChecked = true
    }
  })

  if (!radioChecked) {
    isValid = false
    errorLocation.style.display = "block"
  } else {
    errorLocation.style.display = "none"
  }

  if (termsChecked.checked === false) {
    isValid = false
    errorTerms.style.display = "block"
  } else {
    errorTerms.style.display = "none"
  }

  if (isValid) {
    alert("Merci ! Votre réservation a été reçue.")
  }

  return isValid
}
