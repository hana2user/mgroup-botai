import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMt1xmjz7bsrdVsLVcQzrfciwrYQkdl1Y",
    authDomain: "mgroup-3cf26.firebaseapp.com",
    projectId: "mgroup-3cf26",
    storageBucket: "mgroup-3cf26.firebasestorage.app",
    messagingSenderId: "253850307133",
    appId: "1:253850307133:web:7da7cd80f79535a13cf854"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };