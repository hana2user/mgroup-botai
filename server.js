import express from 'express';
import { generateContent } from './src/services/generateContent.js';

const app = express();
app.use(express.json());
const port = 3000;

app.get('/hello', (req, res) => {
    console.log(process.env.FIREBASE_API_KEY); 
    res.send('Hello World from Express!')});

app.get('/content', async (req, res) => {
    try {
        const { message } = req.body;
        const content = await generateContent(message);
        if ( content == null || content === '') {
            content = 'No content was received :(';
        }
        res.status(200).json({ content });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "An error occurred while generating content." });
    } 
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
