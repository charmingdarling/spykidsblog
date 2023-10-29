// This code is used in the client-side JavaScript to handle form submissions for user login.
// It assumes that the server is set up to handle login requests at the "api/user/login" endpoint

const loginFormHandler = async (event) => {
  // Prevent the default behavior of form submission, prevent refreshing page on submit
  event.preventDefault();

  // Collect values from the login fields
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint that includes the email and password in the request body as JSON
    // http://localhost:3001/api/user/login
    // The fetch function is a modern JavaScript API for making HTTP requests. It returns a Promise that resolves to the Response to that request.
    // The first argument to fetch is the URL to which the request is made ("/api/user/login" in this case).
    // The second argument is an options object that allows you to configure the request, including the method, headers, and body.
    const response = await fetch("/api/user/login", {
      method: "POST",
      // JSON.stringify converts a Javascript Object into a JSON string
      body: JSON.stringify({ email, password }),
      // Headers property is an object that specifies additional information about the request.
      // Content-Type is a standard HTTP header that indicates the type of data in the body of the request.
      // Setting it to "application/json" indicates that the content of the request body is in JSON format.
      headers: { "Content-Type": "application/json" },
    });

    // Note Above: Putting it all together, this code is sending a POST request to the "/api/user/login" endpoint. The body of the request contains the user's email and password in JSON format, and the Content-Type header indicates that the content is in JSON format.
    // This is a common practice when working with APIs that expect JSON data in the request body.
    // The server-side code handling the "/api/user/login" endpoint should be designed to parse the JSON data from the request body.
    // The server-side code, using the Express framework, implicitly handles parsing JSON data from the request body. Specifically, `express.json()`  middleware, which is built into Express.

    if (response.ok) {
      // If successful (in the 200-299 range), redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

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
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
