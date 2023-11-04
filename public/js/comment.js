const newCommentForm = document.getElementById("new-comment-form");
console.log(newCommentForm);
// const commentBtn = document.querySelector(".comment-btn"); // Find the comment button
// const commentForm = document.querySelector(".new-comment-form"); // Find the comment form

// Attach an event listener to the form on submit to the comment form
async function addComment(event) {
  console.log("Comment form submitted");
  // Attached to the form
  event.preventDefault();
  const commentTextarea = document.getElementById("comment").value.trim();
  const postId = newCommentForm.dataset.postid;
  try {
    const response = await fetch("/api/comment/", {
      // This is front end
      // This is the route that the fetch request is sent to (in the controllers/api/commentRoutes.js file)
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentTextarea, postId: postId }),
    });
    console.log(response);

    if (response.ok) {
      //const newComment = await response.json(); // Comment added successfully, you can now update the UI to show the new comment
      //updateBrowserWithNewComment(newComment); // Assuming you have a function to update the UI with the new comment
      document.location.reload();
    } else {
      console.error("Failed to add comment."); // Handle when comment not added successfully
    }
  } catch (err) {
    console.log("Error adding comment", err);
  }
}

newCommentForm.addEventListener("submit", addComment);
