const WebSocket = require("ws");

let users = new Set();

// Intiiate the websocket server
const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
};

// If a new connection is established, the onConnection function is called
const onConnection = (ws) => {
  console.log("New websocket connection");

  ws.on("message", (message) => onMessage(ws, message));
};

// If a new message is received, the onMessage function is called
const onMessage = (ws, message) => {
  console.log("Message received: " + message);
  try {
    const data = JSON.parse(message);

    if (data.type === "join" && data.username) {
      // Füge den Benutzernamen zur Benutzerliste hinzu
      users.add(data.username);
      // Sende die aktualisierte Benutzerliste an alle Clients
      broadcastUserList();
    } else {
      // Hier kannst du weitere Nachrichtenverarbeitung hinzufügen, falls benötigt
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
};

const broadcastUserList = () => {
  const userList = Array.from(users);
  const message = JSON.stringify({ type: "userList", userList });

  // Sende die Benutzerliste an alle verbundenen Clients
  websocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

module.exports = { initializeWebsocketServer };
