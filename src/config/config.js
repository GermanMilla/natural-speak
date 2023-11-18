// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyDlhwQcltAjI278HBk0Z9i8u8fURvxFm7A",
  authDomain: "natural-speaking.firebaseapp.com",
  databaseURL: "https://natural-speaking-default-rtdb.firebaseio.com",
  projectId: "natural-speaking",
  storageBucket: "natural-speaking.appspot.com",
  messagingSenderId: "397374851823",
  appId: "1:397374851823:web:ab94606b061643ca1b691a"
};

// Initialize Firebase
const app = initializeApp(config);
const auth = getAuth(app);

const firebaseConfig = {
    app, auth
}
export default firebaseConfig;

