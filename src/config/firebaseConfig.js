import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9tBKhFFuIms-aOTDTP5wGKHX_6Vdpa3Y",
  authDomain: "gymsmart-2a0d4.firebaseapp.com",
  projectId: "gymsmart-2a0d4",
  storageBucket: "gymsmart-2a0d4.firebasestorage.app",
  messagingSenderId: "612796903564",
  appId: "1:612796903564:web:6ed3bfca186c8bba3f4ba9",
  measurementId: "G-TBCWDT2ELY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
