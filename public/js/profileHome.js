const newFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/post/`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document.body.addEventListener("click", (event) => {
  console.log("IS THIS WORKING?");
  console.log("IS THIS WORKING?");
  console.log(event.target);
  if (event.target.matches(".btn-danger")) {
    delButtonHandler(event);
  }
});

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);
