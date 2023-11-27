(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  const concert = "08/11/2023";

  const countDown = new Date(concert).getTime(),
    x = setInterval(function () {

      const now = new Date().getTime(),
        distance = countDown - now;

      document.getElementById("days").innerText = Math.floor(distance / (day)),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {

        document.getElementById("CD").style.display = "none";
        document.getElementById("upcoming").style.display = "block";
        clearInterval(x);
      }
      //seconds
    }, 0);
})();


function submitForm(event) {
  event.preventDefault(); // Prevent the form from submitting to the server
  // Validate the email field using a regular expression
  const emailInput = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    alert("Please enter a valid email address.");
    return false; // Prevent form submission
  }

  // Just show an alert message
  alert("Form submitted!")
  // Reset the form fields to their default values
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

// Get the modal
var modal = document.getElementById('loginCont');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function submitLogin() {
  const title = document.querySelector("#loginCont h2");
  const usernameInput = document.getElementsByName("uname")[0];
  const passwordInput = document.getElementsByName("psw")[0];

  if (usernameInput.value === passwordInput.value) {
    alert("Username and password cannot be the same.");
    return false; // Prevent form submission
  } else {

    // Reset the form after successful submission
    document.getElementById("loginForm").reset();

    if (title.textContent === "Sign In") {
      alert("Login successfully!");
    }
    else {
      alert("Sign up successfully!");
    }

    return true; // Allow form submission
  }
}

function toggleForm() {
  const title = document.querySelector("#loginCont h2");
  const formLink = document.getElementById("formLink");
  const signInForm = document.getElementById("loginForm");
  const formSpan = document.getElementById("formSpan");
  const loginButton = document.getElementById("sumbitB");
  const rememberMeLabel = document.getElementById("rememberBox");

  if (formLink.textContent === "Sign Up") {
    // Change to Sign Up form
    title.textContent = "Sign Up";
    formLink.textContent = "Login";
    formSpan.textContent = "Already have an account?";
    loginButton.textContent = "Sign Up";

    rememberMeLabel.style.display = "none";
  } else {
    // Change to Login form
    title.textContent = "Sign In";
    formLink.textContent = "Sign Up";
    formSpan.textContent = "Don't have an account yet?";
    loginButton.textContent = "Login";
    rememberMeLabel.style.display = "inline-block";
  }

  // Rreset the form fields when switching between Sign In and Sign Up
  signInForm.reset();
}