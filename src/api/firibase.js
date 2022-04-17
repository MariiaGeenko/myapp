import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6OAtlcEfST6fD_ft7oY3faT06kYAxg7E",
  authDomain: "my-app-46bc5.firebaseapp.com",
  databaseURL:
    "https://my-app-46bc5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-46bc5",
  storageBucket: "my-app-46bc5.appspot.com",
  messagingSenderId: "1070342251648",
  appId: "1:1070342251648:web:ab14566bb690fe38ee3265",
  measurementId: "G-KYC2STNN33",
};

export const firibase = initializeApp(firebaseConfig);

export const analytics = getAnalytics(firibase);
export const auth = getAuth(firibase);
export const database = getDatabase(firibase);
