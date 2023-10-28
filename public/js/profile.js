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

document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);

// 1. Have edit toggle the visibility
// 2. Have it handle the edit

// {{#each user.Posts as |post|}} of profile.handlebars forEach... of line below
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    // line below is targeting line 39 of profile.handlebars for the post.id by the data-id
    const edit = event.target.getAttribute("data-id");
    const editForm = document.querySelector(`.edit-form[data-id="${edit}]`);
    if (editForm) {
      editForm.style.display = editForm.style.display === "none" ? "" : "none";
    }
  });
});

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

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    // Obtain the updated title and content from the form
    const form = document.querySelector(`.edit-form[data-id="${id}"]`);
    const title = form
      .querySelector('input[name="post-name-edit"]')
      .value.trim();
    const content = form
      .querySelector('input[name="post-content-edit"]')
      .value.trim();

    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      document.location.replace("/profile");
    }
  }
};

document.querySelectorAll(".edit-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const editID = form.getAttribute("data-id");
    const obtainPostTitle = form.querySelector("input[name=post-name-edit]");
    const obtainPostContent = form.querySelector(
      "input[name=post-content-edit]"
    );
    // formData = key, new FormData = value ??
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData();
    formData.append("title", obtainPostTitle);
    formData.append("content", obtainPostContent);

    if (title && content) {
      const response = await fetch(`/api/post/${editIDid}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to update post.");
      }
    } else {
      alert("Please fill out both title and content.");
    }
  });
});

document.body.addEventListener("click", (event) => {
  if (event.target.matches(".btn-danger")) {
    delButtonHandler(event);
  }
});
