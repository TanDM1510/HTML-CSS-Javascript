// redirect to change password form
var changePass = () => {
  document.getElementById("login").style.display = "none";
  document.getElementById("resetPass").style.display = "block";
  const errorName = document
    .getElementById("userName")
    .parentElement.parentElement.querySelector(".error-message");
  const errorPass = document
    .getElementById("password")
    .parentElement.parentElement.querySelector(".error-message");
  errorName.innerText = "";
  errorPass.innerText = "";
};
// redirect to login form
var loginPage = () => {
  document.getElementById("login").style.display = "block";
  document.getElementById("resetPass").style.display = "none";
  const errorOldPass = document
    .getElementById("oldPassword")
    .parentElement.parentElement.querySelector(".error-message");
  const errorNewPass = document
    .getElementById("newPassword")
    .parentElement.parentElement.querySelector(".error-message");
  errorNewPass.innerText = "";
  errorOldPass.innerText = "";
};
// validate change password
var passwordDefault = "admin";
var resetPass = () => {
  const oldPassword = document.getElementById("oldPassword").value;
  console.log(oldPassword);
  const newPassword = document.getElementById("newPassword").value;
  console.log(newPassword);
  const errorOldPass = document
    .getElementById("oldPassword")
    .parentElement.parentElement.querySelector(".error-message");
  const errorNewPass = document
    .getElementById("newPassword")
    .parentElement.parentElement.querySelector(".error-message");
  switch (true) {
    case oldPassword.trim() === "" && newPassword.trim() === "":
      errorNewPass.innerText = "Please enter old and new password";
      errorOldPass.innerText = "";
      break;
    case oldPassword.trim() === "":
      errorOldPass.innerText = "Please enter old password";
      errorNewPass.innerText = "";
      break;

    case oldPassword.trim() !== passwordDefault:
      errorOldPass.innerText = "Old password doesn't match";
      errorNewPass.innerText = "";
      break;
    case newPassword.trim() === "":
      errorNewPass.innerText = "Please enter new password";
      errorOldPass.innerText = "";
      break;
    case newPassword === passwordDefault:
      errorNewPass.innerText =
        "New password should not match with old password";
      errorOldPass = "";
      break;
    case oldPassword === passwordDefault && newPassword !== passwordDefault:
      passwordDefault = newPassword;
      console.log(passwordDefault);
      errorNewPass.innerText = "";
      errorOldPass.innerText = "";
      document.getElementById("login").style.display = "block";
      document.getElementById("resetPass").style.display = "none";
      document.getElementById("toastify").style.display = "block";
      break;
    default:
      errorNewPass.innerText = "There was an error";
  }
};
// validate login
var login = () => {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const errorName = document
    .getElementById("userName")
    .parentElement.parentElement.querySelector(".error-message");
  const errorPass = document
    .getElementById("password")
    .parentElement.parentElement.querySelector(".error-message");
  const myModal = bootstrap.Modal.getOrCreateInstance("#exampleModal");
  const modal = document.getElementById("#exampleModal");
  switch (true) {
    case userName === "admin" && password === passwordDefault:
      errorName.innerText = "";
      errorPass.innerText = "";
      document.getElementById("userName").value = "";
      document.getElementById("password").value = "";
      myModal.hide();
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
      document.getElementById("open-form").style.display = "none";
      document.getElementById("login-success").style.display = "block";
      break;
    case password.trim() === "" && userName.trim() === "":
      errorPass.innerText = "Please enter your username and password";
      errorName.innerText = "";
      break;
    case userName.trim() === "":
      errorName.innerText = "Please enter your user name";
      errorPass.innerText = "";
      break;

    case password.trim() === "":
      errorPass.innerText = "Please enter your password";
      errorName.innerText = "";
      break;

    default:
      errorPass.innerText = "Wrong user name or password";
      errorName.innerText = "";
      break;
  }
};
