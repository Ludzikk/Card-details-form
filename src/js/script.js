const inputs = document.querySelectorAll(".main__input");
const cardNumber = document.querySelector(".main__textcard--number");
const cardName = document.querySelector(".main__textcard--name");
const cardCvc = document.querySelector(".main__textcard--cvc");
const cardMonth = document.querySelector(".main__textcard--month");
const cardYear = document.querySelector(".main__textcard--year");
const errorDate = document.querySelector(".main__error--date");
const errorName = document.querySelector(".main__error--name");
const errorNumber = document.querySelector(".main__error--number");
const errorCvc = document.querySelector(".main__error--cvc");
const submitBtn = document.querySelector(".main__btn--submit");
const continueBtn = document.querySelector(".main__btn--continue");
const submitBox = document.querySelector(".main__submit");
const popupBox = document.querySelector(".main__popup");

function checkIdOfInput() {
  switch (this.id) {
    case "number":
      const numberValidation = cardNumber.textContent;

      if (this.value !== "") {
        cardNumber.textContent = this.value;

        if (
          cardNumber.textContent.length % 4 === 0 &&
          cardNumber.textContent.length === 4
        ) {
          this.value = cardNumber.textContent + " ";
        } else if (
          cardNumber.textContent.length % 9 === 0 &&
          cardNumber.textContent.length === 9
        ) {
          this.value = cardNumber.textContent + " ";
        } else if (
          cardNumber.textContent.length % 14 === 0 &&
          cardNumber.textContent.length === 14
        ) {
          this.value = cardNumber.textContent + " ";
        }

        if (cardNumber.textContent.length > 19) {
          cardNumber.textContent = cardNumber.textContent.slice(0, 19);
          this.value = cardNumber.textContent;
        }

        if (numberValidation.match(/[a-zA-Z]+/)) {
          errorNumber.textContent = "Wrong format";
          this.classList.add("errorinput");
        } else {
          errorNumber.textContent = "";
          this.classList.remove("errorinput");
        }
      } else {
        cardNumber.textContent = "0000 0000 0000 0000";
        errorNumber.textContent = "";
        this.classList.remove("errorinput");
      }
      break;
    case "name":
      const nameValidation = cardName.textContent;

      if (this.value !== "") {
        cardName.textContent = this.value;

        if (cardName.textContent.length > 22) {
          cardName.textContent = cardName.textContent.slice(0, 22);
          this.value = cardName.textContent;
        }

        if (nameValidation.match(/[0-9]+/)) {
          errorName.textContent = "Wrong format";
          this.classList.add("errorinput");
        } else {
          errorName.textContent = "";
          this.classList.remove("errorinput");
        }
      } else {
        cardName.textContent = "jane appleseed";
        errorName.textContent = "";
        this.classList.remove("errorinput");
      }
      break;
    case "month":
      if (this.value !== "") {
        cardMonth.textContent = this.value;

        if (cardMonth.textContent.length > 2) {
          cardMonth.textContent = cardMonth.textContent.slice(0, 2);
          this.value = cardMonth.textContent;
        }

        if (this.value > 12 || this.value < 1) {
          errorDate.textContent = "Wrong date";
          this.classList.add("errorinput");
        } else {
          errorDate.textContent = "";
          this.classList.remove("errorinput");
        }
      } else {
        cardMonth.textContent = "00";
        errorDate.textContent = "";
        this.classList.remove("errorinput");
      }
      break;
    case "year":
      if (this.value !== "") {
        cardYear.textContent = this.value;

        if (cardYear.textContent.length > 2) {
          cardYear.textContent = cardYear.textContent.slice(0, 2);
          this.value = cardYear.textContent;
        }

        if (
          cardYear.textContent.length === 2 &&
          (this.value > 32 || this.value < 24)
        ) {
          errorDate.textContent = "Wrong date";
          this.classList.add("errorinput");
        } else {
          errorDate.textContent = "";
          this.classList.remove("errorinput");
        }
      } else {
        cardYear.textContent = "00";
        errorDate.textContent = "";
        this.classList.remove("errorinput");
      }
      break;
    case "cvc":
      if (this.value !== "") {
        cardCvc.textContent = this.value;

        if (cardCvc.textContent.length > 3) {
          cardCvc.textContent = cardCvc.textContent.slice(0, 3);
          this.value = cardCvc.textContent;
        }

        if (cardCvc.textContent > 0) {
          errorCvc.textContent = "";
          this.classList.remove("errorinput");
        }
      } else {
        cardCvc.textContent = "000";
        errorCvc.textContent = "";
        this.classList.remove("errorinput");
      }
      break;
  }
}

const resetErrors = () => {
  errorDate.textContent = "";
  errorNumber.textContent = "";
  errorName.textContent = "";
  errorCvc.textContent = "";

  inputs.forEach((input) => {
    input.classList.remove("errorinput");
    input.value = "";
  });

  cardCvc.textContent = "000";
  cardName.textContent = "jane appleseed";
  cardNumber.textContent = "0000 0000 0000 0000";
  cardMonth.textContent = "00";
  cardYear.textContent = "00";
};

const checkIfFilledInputs = () => {
  let emptyInputs = 0;

  inputs.forEach((input) => {
    if (input.value === "") {
      emptyInputs++;
    }

    if (input.value === "") {
      switch (input.id) {
        case "number":
          input.classList.add("errorinput");
          errorNumber.textContent = "Empty";
          break;
        case "name":
          input.classList.add("errorinput");
          errorName.textContent = "Empty";
          break;
        case "month":
          input.classList.add("errorinput");
          errorDate.textContent = "Empty";
          break;
        case "year":
          input.classList.add("errorinput");
          errorDate.textContent = "Empty";
          break;
        case "cvc":
          input.classList.add("errorinput");
          errorCvc.textContent = "Empty";
          break;
      }
    }

    if (
      input.value !== "" &&
      input.id === "number" &&
      input.value.length !== 19
    ) {
      input.classList.add("errorinput");
      errorNumber.textContent = "Too short";
    }

    if (input.value !== "" && input.id === "cvc" && input.value.length !== 3) {
      input.classList.add("errorinput");
      errorCvc.textContent = "Too short";
    }
  });

  if (emptyInputs === 0) {
    checkIfAnyErrors();
  }
};

const checkIfAnyErrors = () => {
  let errorOfInput = 0;

  inputs.forEach((input) => {
    if (input.classList.contains("errorinput")) {
      errorOfInput++;
    }
  });

  if (errorOfInput === 0) {
    submitForm();
  }
};

const submitForm = () => {
  submitBox.classList.toggle("hidden");
  popupBox.classList.toggle("hidden");
};

submitBtn.addEventListener("click", checkIfFilledInputs);
continueBtn.addEventListener("click", () => {
  resetErrors();
  submitForm();
});

inputs.forEach((input) => input.addEventListener("keyup", checkIdOfInput));
