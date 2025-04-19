import { WebSocketServer } from 'ws';
import { generateContent } from './src/services/generateContent.js';

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client is connected');

  ws.on('message', async (messageBuffer) => {
    try {
      const data = JSON.parse(messageBuffer.toString());
      const { message } = data;

      console.log('Received from client:', message);

      let content = await generateContent(message);
      if (!content) {
        content = 'No content was received.';
      }

      ws.send(JSON.stringify({ content }));
    } catch (err) {
      console.error('Processing error:', err);
      ws.send(JSON.stringify({ error: 'Error on server' }));
    }
  });

  ws.on('close', () => {
    console.log('Client has disconnected');
  });
});

console.log(`WebSocket listens port ${PORT}`);
