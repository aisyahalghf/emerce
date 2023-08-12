import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNBJkaG_VuAs9uGy33UupUSTlIl9_aWNw",
  authDomain: "ecommerce-firebase-app-34b54.firebaseapp.com",
  projectId: "ecommerce-firebase-app-34b54",
  storageBucket: "ecommerce-firebase-app-34b54.appspot.com",
  messagingSenderId: "902483998658",
  appId: "1:902483998658:web:91f2c143ebf7466d69085b",
  measurementId: "G-3GHJZKSPPV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
