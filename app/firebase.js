// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYKpKdrMl4KhM9FFTdHP1q1hJe36trbpc",
  authDomain: "ai-flashcards-56156.firebaseapp.com",
  projectId: "ai-flashcards-56156",
  storageBucket: "ai-flashcards-56156.appspot.com",
  messagingSenderId: "778027607429",
  appId: "1:778027607429:web:4bbebf048a32b1328210ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;