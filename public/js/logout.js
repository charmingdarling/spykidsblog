const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);
