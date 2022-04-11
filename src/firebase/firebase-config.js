import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvJQR8fadTpwJfDlRE3QSiyISjb0o9qvI",
  authDomain: "react-app-curso-fherrera-1d1e9.firebaseapp.com",
  projectId: "react-app-curso-fherrera-1d1e9",
  storageBucket: "react-app-curso-fherrera-1d1e9.appspot.com",
  messagingSenderId: "843551284984",
  appId: "1:843551284984:web:7427b42af97af0fcfb650d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const provider = new GoogleAuthProvider()
const auth = getAuth()

export{
    db, 
    app,
    provider,
    auth
}
