import throttle from "lodash.throttle";

const inputEl = document.querySelector("input[type='email']");
const textareaEl = document.querySelector("textarea[name='message']");
const formEl = document.querySelector(".feedback-form");

const getFormState = () => {
  const formState = {
    email: inputEl.value,
    message: textareaEl.value,
  };
  localStorage.setItem("feedback-form-state", JSON.stringify(formState));
};

const loadFormState = () => {
  const formState =
    JSON.parse(localStorage.getItem("feedback-form-state")) || {};
  inputEl.value = formState.email || "";
  textareaEl.value = formState.message || "";
};

const clearFormState = () => {
  const formState = JSON.parse(localStorage.getItem("feedback-form-state"));
  localStorage.removeItem("feedback-form-state");
  inputEl.value = "";
  textareaEl.value = "";
  console.log(formState);
};

inputEl.addEventListener("input", throttle(getFormState, 500));
textareaEl.addEventListener("input", throttle(getFormState, 500));

loadFormState();

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  clearFormState();
});
