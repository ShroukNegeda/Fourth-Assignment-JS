var loginPage = document.getElementById("loginPage");
var registerPage = document.getElementById("registerPage");
var homePage = document.getElementById("homePage");
var goRegister = document.getElementById("goRegister");
var goLogin = document.getElementById("goLogin");

goRegister.onclick = () => {
  loginPage.classList.remove("active");
  registerPage.classList.add("active");
};

goLogin.onclick = () => {
  registerPage.classList.remove("active");
  loginPage.classList.add("active");
};

document.getElementById("registerBtn").onclick = function () {
  var name = document.getElementById("regName").value.trim();
  var email = document.getElementById("regEmail").value.trim();
  var password = document.getElementById("regPassword").value.trim();
  var msg = document.getElementById("registerMessage");

msg.textContent = "";

if (!name || !email || !password) {
  msg.textContent = "All fields are required!";
  return;
}

var emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if (!emailRegex.test(email)) {
  msg.textContent = "Invalid email format!";
  return;
}
let users = JSON.parse(localStorage.getItem("users")) || [];
var exists = users.find((u) => u.email === email);
if (exists) {
  msg.textContent = "Email already exists!";
  return;
}

users.push({ name, email, password });
localStorage.setItem("users", JSON.stringify(users));

msg.style.color = "lightgreen";
msg.textContent = "Registration successful! Redirecting...";
setTimeout(() => {
  registerPage.classList.remove("active");
  loginPage.classList.add("active");
}, 1200);
};

document.getElementById("loginBtn").onclick = function () {
  var email = document.getElementById("loginEmail").value.trim();
  var password = document.getElementById("loginPassword").value.trim();
  var msg = document.getElementById("loginMessage");

msg.textContent = "";

if (!email || !password) {
  msg.textContent = "Please fill all fields!";
  return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];
var user = users.find((u) => u.email === email && u.password === password);

if (user) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
  showHome(user);
} else {
  msg.textContent = "Invalid email or password!";
}
};

function showHome(user) {
  loginPage.classList.remove("active");
  registerPage.classList.remove("active");
  homePage.classList.add("active");
  document.getElementById("welcomeMsg").textContent = `Welcome ${user.name}`;
}

document.getElementById("logoutBtn").onclick = function () {
  localStorage.removeItem("loggedUser");
  homePage.classList.remove("active");
  loginPage.classList.add("active");
};

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if (loggedUser) showHome(loggedUser);