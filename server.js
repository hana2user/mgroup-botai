import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World from Express!'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
