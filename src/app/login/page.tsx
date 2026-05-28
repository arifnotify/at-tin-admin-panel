localStorage.setItem(
  "token",
  res.data.access_token,
);

window.location.href =
  "/dashboard";