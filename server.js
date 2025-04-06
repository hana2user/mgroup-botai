import express from 'express';
import cors from 'cors';
import { generateContent } from './src/services/generateContent.js';

const corsOptions = {
    origin: ['https://mgroup.onrender.com', 'http://localhost:3000'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const port = 3000;

app.get('/hello', (req, res) => {
    res.send('Hello World from Express!')
});

app.post('/content', async (req, res) => {
    try {
        const { message } = req.body;
        const content = await generateContent(message);
        if (content == null || content === '') {
            content = 'No content was received.';
        }
        res.status(200).json({ content });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "An error occurred while generating content." });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
