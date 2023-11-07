// This logic goes to the postRoutes in your /controllers/api
// This is the one for updates WORKING
document
  .querySelector("#update-form")
  .addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
      console.log("update-form submitted");
      // Get the post ID, title, content from the ID element in HTML on edit.handlebars
      const postID = document.querySelector("#postID").value; // ID of the post we want to edit
      const title = document.querySelector("#title").value.trim();
      const content = document.querySelector("#update-content").value.trim();

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
      console.error(error);
      alert("An error occurred while updating the post.");
    }
  });
