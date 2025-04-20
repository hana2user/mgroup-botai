import { WebSocketServer } from 'ws';
import { fetchFbData, generateContent } from './src/services/generateContent.js';
import { getRandomPhrase, loadPhrases } from './src/services/getRandomPhrase.js';

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

await fetchFbData();
await loadPhrases();

wss.on('connection', (ws) => {
  console.log('Client is connected');

  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

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

const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        console.log('Dead conection detected. Deleting.');
        return ws.terminate();
      }
  
      ws.isAlive = false;
      ws.ping();
      const message = getRandomPhrase();
      ws.send(JSON.stringify({ system: message }));
    });
  }, 30000);
  
wss.on('close', () => clearInterval(interval));

console.log(`WebSocket listens port ${PORT}`);
