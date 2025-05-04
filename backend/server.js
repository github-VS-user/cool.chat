const WebSocket = require("ws");
const PORT = process.env.PORT || 10000;
const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on("connection", (ws) => {
  clients.push(ws);
  ws.on("message", (data) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log(`WebSocket server running on port ${PORT}`);
