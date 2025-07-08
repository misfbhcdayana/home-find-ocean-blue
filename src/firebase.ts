import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjCFX4-A6nPxPVUCLve6MBI2Qt2X0Ht1Q",
  authDomain: "locateyourhome-cf375.firebaseapp.com",
  projectId: "locateyourhome-cf375",
  storageBucket: "locateyourhome-cf375.appspot.com",
  messagingSenderId: "1019352166196",
  appId: "1:1019352166196:web:cd6c126c300ede30f5bf61",
  measurementId: "G-6ZPT9R3CR8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 