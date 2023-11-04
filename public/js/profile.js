// change to ID

// 1. Have edit toggle the visibility
// 2. Have it handle the edit

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/post/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to delete project");
//     }
//   }
// };

// const editButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     // Obtain the updated title and content from the form
//     const form = document.querySelector(`.edit-form[data-id="${id}"]`);
//     const title = form
//       .querySelector('input[name="post-name-edit"]')
//       .value.trim();
//     const content = form
//       .querySelector('input[name="post-content-edit"]')
//       .value.trim();

//     const response = await fetch(`/api/post/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ title, content }),
//     });
//     if (response.ok) {
//       document.location.replace("/profile");
//     }
//   }
// };

//This is the one for updates WORKING
document
  .querySelector("#update-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("update-form submitted");
    // Get the post ID, title, content fom the ID element in HTML on edit.handlebars
    const postID = document.querySelector("#postID").value;
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#update-content").value.trim();
    try {
      if (title && content) {
        const response = await fetch(`/api/post/${postID}`, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          // Redirect to dashboard/profile page
          document.location.href = `/profile`;
        } else {
          alert("Failed to update post.");
        }
      } else {
        alert("Please fill out both title and content.");
      }
    } catch (error) {
      alert(error);
    }
  });
