import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "love-fortune-ai.firebaseapp.com",
  projectId: "love-fortune-ai",
  storageBucket: "love-fortune-ai.firebasestorage.app",
  messagingSenderId: "1066391027723",
  appId: "1:1066391027723:web:23cdeeb898af6a838bc70e"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)