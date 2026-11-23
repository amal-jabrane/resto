const form = document.querySelector("#form-reservation");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const telephone = document.querySelector("#telephone");
const personnes = document.querySelector("#personnes");
const dateReservation = document.querySelector("#date");
const heureReservation = document.querySelector("#heure");
const remarque = document.querySelector("#remarque");
const messageSucces = document.querySelector("#message-succes");

function afficherErreur(champ, idErreur, texte) {
  document.querySelector(idErreur).textContent = texte;
  champ.classList.add("erreur-bordure");
}

function effacerErreur(champ, idErreur) {
  document.querySelector(idErreur).textContent = "";
  champ.classList.remove("erreur-bordure");
}

nom.addEventListener("input", () => effacerErreur(nom, "#erreur-nom"));
email.addEventListener("input", () => effacerErreur(email, "#erreur-email"));
telephone.addEventListener("input", () => effacerErreur(telephone, "#erreur-telephone"));
personnes.addEventListener("input", () => effacerErreur(personnes, "#erreur-personnes"));
dateReservation.addEventListener("input", () => effacerErreur(dateReservation, "#erreur-date"));
heureReservation.addEventListener("input", () => effacerErreur(heureReservation, "#erreur-heure"));
remarque.addEventListener("input", () => effacerErreur(remarque, "#erreur-remarque"));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let toutEstOk = true;
  messageSucces.textContent = "";

  if (nom.value.trim().length < 2) {
    afficherErreur(nom, "#erreur-nom", "Le nom contient au moins 2 lettres");
    toutEstOk = false;
  }
if (!email.value.includes("@") || !email.value.includes(".")) {
    afficherErreur(email, "#erreur-email", "Email invalide, doit contenir @ et .");
    toutEstOk = false;
  }

  let telRegex = /^\+216[0-9]{8}$/;
  if (!telRegex.test(telephone.value.trim())) {
    afficherErreur(telephone, "#erreur-telephone", "Obligatoire commence par +216 + 8 chiffres, ex: +21622550211");
    toutEstOk = false;
  }

  let nb = Number(personnes.value);
  if (nb < 1 || nb > 20) {
    afficherErreur(personnes, "#erreur-personnes", "Nombre de personnes entre 1 et 20");
    toutEstOk = false;
  }

  if (dateReservation.value === "") {
    afficherErreur(dateReservation, "#erreur-date", "Choisissez une date");
    toutEstOk = false;
  }

  if (
    heureReservation.value < "11:00" ||
    heureReservation.value > "23:00" ||
    heureReservation.value === ""
  ) {
    afficherErreur(heureReservation, "#erreur-heure", "Ouvert de 11:00 à 23:00");
    toutEstOk = false;
  }

if (remarque.value.length > 200) {
    afficherErreur(remarque, "#erreur-remarque", "Maximum 200 caractères");
    toutEstOk = false;
  }

  if (toutEstOk) {
    messageSucces.textContent = "Réservation confirmée avec succès !";
    form.reset();
  }
});