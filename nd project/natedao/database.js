// store email and password in an object
const users = {};

// function to show registration form
function showRegister() {
  document.getElementById("login").style.display = "none"; // hide login form
  document.getElementById("register").style.display = "block"; // show registration form
}

// function to show login form
function showLogin() {
  document.getElementById("register").style.display = "none"; // hide registration form
  document.getElementById("login").style.display = "block"; // show login form
}

// function to register new user
function register(event) {
  event.preventDefault(); // prevent default form submission
  const newEmail = document.getElementById("newEmail").value;
  const newPassword = document.getElementById("newPassword").value;
  users[newEmail] = newPassword; // add new user to the object
  alert("Registration successful. Please login to continue.");
  showLogin(); // show login form after successful registration
}

// function to log in user
function login(event) {
  event.preventDefault(); // prevent default form submission
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (users[email] === password) { // check if user exists and password matches
    document.getElementById("login").style.display = "none"; // hide login form
    document.getElementById("register").style.display = "none"; // hide registration form
    document.getElementById("hello").style.display = "block"; // show hello page
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

// function to return to login page
function logout() {
  document.getElementById("login").style.display = "block"; // show login form
  document.getElementById("register").style.display = "none"; // hide registration form
  document.getElementById("hello").style.display = "none"; // hide hello page
}
