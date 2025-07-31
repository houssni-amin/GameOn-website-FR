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
const navLinks = document.querySelectorAll(".topnav a")

// Ajoute le style "active" au lien cliqué et le retire des autres
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"))
    this.classList.add("active")
  })
})

// Ouvre la modal d'inscription
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))
function launchModal() {
  modalbg.style.display = "block"
}

// Ferme la modal d'inscription
btnCloseModal.addEventListener("click", () => {
  modalbg.style.display = "none"
})

// Ferme la modal de confirmation
closeConfirmation.addEventListener("click", () => {
  confirmationModal.style.display = "none"
})

// Vérifie que le prénom a au moins 2 caractères
function validateFirst() {
  if (inputFirst.value.length < 2) {
    errorFirst.style.display = "block"
    return false
  }
  errorFirst.style.display = "none"
  return true
}

// Vérifie que le nom a au moins 2 caractères
function validateLast() {
  if (inputLast.value.length < 2) {
    errorLast.style.display = "block"
    return false
  }
  errorLast.style.display = "none"
  return true
}

// Vérifie la validité de l'email avec la regex
function validateEmail() {
  if (!emailRegex.test(inputEmail.value)) {
    errorEmail.style.display = "block"
    return false
  }
  errorEmail.style.display = "none"
  return true
}

// Vérifie la date de naissance
function validateBirthdate() {
  const birthdateValue = inputBirthdate.value
  const birthdate = new Date(birthdateValue)
  const today = new Date()

  // Vérifie si la date est vide ou dans le futur
  if (!birthdateValue || birthdate > today) {
    errorBirthdate.textContent = "Veuillez entrer une date de naissance valide."
    errorBirthdate.style.display = "block"
    return false
  }

  // Calcule l'âge exact
  const age = today.getFullYear() - birthdate.getFullYear()
  const hasBirthdayThisYear =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate())

  const realAge = hasBirthdayThisYear ? age : age - 1

  // Vérifie que l'utilisateur a au moins 13 ans
  if (realAge < 13) {
    errorBirthdate.textContent =
      "Vous devez avoir au moins 13 ans pour vous inscrire."
    errorBirthdate.style.display = "block"
    return false
  }

  errorBirthdate.style.display = "none"
  return true
}

// Vérifie que le champ quantité n'est pas vide
function validateQuantity() {
  if (inputQuantity.value === "") {
    errorQuantity.style.display = "block"
    return false
  }
  errorQuantity.style.display = "none"
  return true
}

// Vérifie qu'un lieu a bien été sélectionné
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

// Vérifie que les CGU sont cochées
function validateTerms() {
  if (!termsChecked.checked) {
    errorTerms.style.display = "block"
    return false
  }
  errorTerms.style.display = "none"
  return true
}

// Fonction globale de validation
function validate() {
  const isFirstValid = validateFirst()
  const isLastValid = validateLast()
  const isEmailValid = validateEmail()
  const isBirthdateValid = validateBirthdate()
  const isQuantityValid = validateQuantity()
  const isLocationValid = validateLocation()
  const isTermsValid = validateTerms()

  // Vérifie que tout est valide
  const isValid =
    isFirstValid &&
    isLastValid &&
    isEmailValid &&
    isBirthdateValid &&
    isQuantityValid &&
    isLocationValid &&
    isTermsValid

  if (isValid) {
    // Affiche les valeurs dans la console
    console.log("Prénom :", inputFirst.value)
    console.log("Nom :", inputLast.value)
    console.log("Email :", inputEmail.value)
    console.log("Date de naissance :", inputBirthdate.value)
    console.log("Quantité :", inputQuantity.value)

    const selectedLocation = Array.from(radioLocations).find((r) => r.checked)
    console.log("Ville choisie :", selectedLocation.value)

    console.log("Conditions acceptées :", termsChecked.checked)

    const wantsNotifications = document.querySelector("#checkbox2").checked
    console.log("Souhaite être prévenu :", wantsNotifications)

    // Ferme la modal et affiche celle de confirmation
    modalbg.style.display = "none"
    confirmationModal.style.display = "block"

    // Prépare les données à envoyer par email
    const formData = {
      from_name: inputFirst.value + " " + inputLast.value,
      first_name: inputFirst.value,
      last_name: inputLast.value,
      email: inputEmail.value,
      birthdate: inputBirthdate.value,
      quantity: inputQuantity.value,
      location:
        document.querySelector('input[name="location"]:checked')?.value || "",
    }

    // Envoie l'email avec EmailJS
    window
      .sendEmail(formData)
      .then(() => console.log("✅ Email envoyé avec succès !"))
      .catch((error) => console.error("❌ Erreur lors de l'envoi :", error))

    form.reset()
    return false
  }

  return false
}
