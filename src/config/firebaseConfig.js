import dotenv from 'dotenv';
dotenv.config();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: "mgroup-3cf26.firebaseapp.com",
    projectId: "mgroup-3cf26",
    storageBucket: "mgroup-3cf26.firebasestorage.app",
    messagingSenderId: "253850307133",
    appId: "1:253850307133:web:86df02e9e69fb3ad3cf854"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };