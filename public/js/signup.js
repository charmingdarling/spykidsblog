// This code is used in the client-side JavaScript to handle form submissions for user login.
// It assumes that the server is set up to handle login requests at the "api/user/signup" endpoint

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      // stringify data, because data in transmission can only be sent as a string
      // except when it gets to our routes, it has already been parsed due to server.js having "app.use(express.json());" Example of Parse: Username = "John Smith"
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
