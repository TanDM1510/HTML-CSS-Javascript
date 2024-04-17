// var modal = document.getElementById("id01");
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
var onSubmit = () => {
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const userNameField = document
    .getElementById("userName")
    .parentElement.parentElement.querySelector(".error-message");

  const passwordField = document
    .getElementById("password")
    .parentElement.parentElement.querySelector(".error-message");

  userNameField.innerText = "";
  passwordField.innerText = "";
  let loginState = "";

  switch (true) {
    case userName === "":
      loginState = "missingUsername";
      break;
    case password === "":
      loginState = "missingPassword";
      break;
    case userName === "admin" && password === "admin":
      loginState = "loginSuccess";
      break;
    default:
      loginState = "invalidCredentials";
  }

  switch (loginState) {
    case "missingUsername":
      userNameField.innerText = "Please enter your username";
      break;
    case "missingPassword":
      passwordField.innerText = "Please enter your password";
      break;
    case "loginSuccess":
      document.getElementById("id01").style.display = "none";
      document.getElementById("login").style.display = "none";
      document.getElementById("login-success").style.display = "flex";
      break;
    case "invalidCredentials":
      userNameField.innerText = "";
      passwordField.innerText = "Invalid username or password";
      break;
  }
};
