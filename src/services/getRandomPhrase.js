import { readFile } from 'fs/promises';

let phrases = [];

export async function loadPhrases() {
  try {
    const data = await readFile('../assets/phrases.json', 'utf-8');
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
