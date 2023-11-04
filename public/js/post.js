// This code is used in the client-side JavaScript to handle form submissions for user post.
// It assumes that the server is set up to handle login requests at the "http://localhost:3001/api/user/singlepost/:id" endpoint

// Grab HTML elements and then allow them to be called upon
const editButton = document.querySelector(".edit-post-button");
const deleteButton = document.querySelector("delete-post-button");

// Functions to edit post

function editPost() {
  console.log("BEGINNING TO EDIT POST. -----------------");
  const postID = document.querySelector("singlepost").dataset.postID;

  document.location.replace(`/profile/edit/${postID}`);
}

editButton.addEventListener("click", editPost);
