// script.js
document.addEventListener("DOMContentLoaded", function () {
  const socket = new WebSocket("ws://localhost:3000");
  const usernameInput = document.getElementById("username");
  const joinChatButton = document.getElementById("join-chat-button");
  const userListContainer = document.getElementById("user-list");

  joinChatButton.addEventListener("click", () => {
      const username = usernameInput.value;
      if (username) {
          socket.send(JSON.stringify({ type: "join", username }));
      }
  });

  socket.addEventListener("open", (event) => {
      console.log("WebSocket connected!");
      socket.send(JSON.stringify({ type: "hello" }));
  });

  socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "userList") {
          updateUserList(data.userList);
      } else {
          console.log(`Received message: ${data.message}`);
      }
  });

  socket.addEventListener("close", (event) => {
      console.log("WebSocket closed.");
  });

  socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
  });

  const updateUserList = (userList) => {
      userListContainer.innerHTML = "<h3>Users Online:</h3>";
      const ul = document.createElement("ul");
      userList.forEach((user) => {
          const li = document.createElement("li");
          li.textContent = user;
          ul.appendChild(li);
      });
      userListContainer.appendChild(ul);
  };
});
