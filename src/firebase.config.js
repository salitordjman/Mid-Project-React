import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_lPV8xLlTpZXQqzOZVLZPlXoPvat4Gg4",
  authDomain: "midproject-sali.firebaseapp.com",
  projectId: "midproject-sali",
  storageBucket: "midproject-sali.appspot.com",
  messagingSenderId: "912884579617",
  appId: "1:912884579617:web:c3c8bddac4780516b95260",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
