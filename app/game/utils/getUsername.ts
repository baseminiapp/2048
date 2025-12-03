export function getUsername() {
  if (typeof window === "undefined") return "Anonymous";

  let username = localStorage.getItem("username");
  if (!username) {
    username = prompt("Enter your username") || "Anonymous";
    localStorage.setItem("username", username);
  }
  return username;
}
