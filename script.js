let username = "";
const socket = new WebSocket("https://cool-chat-qgqm.onrender.com");

document.getElementById("username").addEventListener("keypress", function(e) {
  if (e.key === "Enter" && this.value.trim() !== "") {
    username = this.value.trim();
    this.disabled = true;
    document.getElementById("message").disabled = false;
    document.getElementById("message").focus();
  }
});

let canSend = true;

document.getElementById("message").addEventListener("keypress", function(e) {
  if (e.key === "Enter" && this.value.trim() !== "" && canSend) {
    const msg = this.value.trim();
    socket.send(JSON.stringify({ username, message: msg }));
    this.value = "";
    canSend = false;
    setTimeout(() => canSend = true, 2000);
  }
});

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const box = document.getElementById("chatbox");
  const el = document.createElement("div");
  el.innerHTML = `<strong>${data.username}</strong>: ${data.message}`;
  box.appendChild(el);
  box.scrollTop = box.scrollHeight;
};
