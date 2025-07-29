import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "lubber-driver",
  appId: "1:387473047278:web:dd4487dfd2b534ba30fdff",
  databaseURL: "https://lubber-driver-default-rtdb.firebaseio.com",
  storageBucket: "lubber-driver.firebasestorage.app",
  apiKey: "AIzaSyB8pUOZ9_5Q3T1JiiaWalLn7FTZcAdW6oE",
  authDomain: "lubber-driver.firebaseapp.com",
  messagingSenderId: "387473047278",
  measurementId: "G-11HM93G0CT"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
