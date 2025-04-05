import { collection, getDocs } from "firebase/firestore";
import { firebaseApp, db } from "../config/firebaseConfig.js";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";

const COLLECTION_NAME = "company_info";

async function fetchData() {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  let documents = [];
  querySnapshot.forEach((doc) => {
    documents.push(doc.data());
  });
  return documents;
}

export async function generateContent(question) {
  const firestoreData = await fetchData();
  
  if (firestoreData.length === 0) {
    console.log("No Firestore data found!");
    return;
  }

  const dataText = firestoreData.map(doc => JSON.stringify(doc)).join("\n");

  const systemInstruction = {
    role: "system",
    parts: [{
      text: `Answer only about Mgroup based on this company information:\n${dataText}.
            However, your answer is not limited to this information. 
            You can provide additional facts and context to give a more complete and detailed information about Mgroup.
            If there are no answer in the information, respond with: "I have no the information."
            Make sure to provide a detailed, well-rounded response that covers all possible aspects related to the question.
            If the question does not contain "Mgroup", respond with: "I'm answering only about Mgroup."`
    }]
  };

  const vertexAI = getVertexAI(firebaseApp, { location: "us-central1" });

  const model = getGenerativeModel(vertexAI, {
    model: "gemini-2.0-flash-001",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    systemInstruction,
  });

  return await sendContent(model, question);
}

async function sendContent(model, content) {
  const result = await model.generateContent(content);
  
  return result.response.text();
}
