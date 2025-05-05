const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = process.env.PORT || 3000;  // Use Railway's dynamic port

const wss = new WebSocket.Server({ noServer: true });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send('Hello, client!');
  });
});

// Ensure your server is listening to the correct port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
