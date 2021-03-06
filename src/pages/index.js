import "./index.css";
import {
  editProfilePopup,
  popups,
  editButton,
  popupAdd,
  addButton,
  sumbitCardButton,
  avatarEditButton,
  popupEditAvatar,
  sumbitAvatarButton,
  profileName,
  profilehobby,
  profileAvatar,
} from "../components/constants";
import { enableValidation } from "../components/validate";
import {
  openPopup,
  closePopup,
  submitProfileForm,
  insertProfileData,
  submitAvatarForm,
} from "../components/modal";
import { prependCard } from "../components/cards";
import { getInitialCards, getInitialUser } from "../components/api";

editProfilePopup.addEventListener("submit", submitProfileForm);

popupEditAvatar.addEventListener("submit", submitAvatarForm);

editButton.addEventListener("click", function () {
  insertProfileData();
  openPopup(editProfilePopup);
});

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
  sumbitCardButton.disabled = true;
});

avatarEditButton.addEventListener("click", function () {
  openPopup(popupEditAvatar);
  sumbitAvatarButton.disabled = true;
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__submit",
  inputErrorClass: "popup__input_error",
});

Promise.all([getInitialCards(), getInitialUser()])
  .then(([cards, userData]) => {
      profileName.textContent = userData.name;
      profilehobby.textContent = userData.about;
      profileAvatar.src = userData.avatar;
    cards.forEach(prependCard)

  })
  .catch((err) => {console.log(err);});
