import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

let phrases = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../assets/phrases.json');

export async function loadPhrases() {
  try {
    const data = await readFile(filePath, 'utf-8');
    phrases = JSON.parse(data);
  } catch (err) {
    console.error('Failed to load phrases:', err);
    phrases = ["It's nice talking to you!"];
  }
}

export function getRandomPhrase() {
  if (phrases.length === 0) return "No phrases loaded.";
  const i = Math.floor(Math.random() * phrases.length);
  return phrases[i];
}
