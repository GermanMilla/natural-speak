import firebaseConfig from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
const auth = firebaseConfig.auth;


const loginUser = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
    return signOut(auth);
};


const subscribetoAuthChanges = (handleAuthChange) => {
    onAuthStateChanged(auth, (user) =>{
        handleAuthChange(user);
    })
};

const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
};


const FirebaseAuthService = {
    loginUser,
    logoutUser,
    subscribetoAuthChanges,
    passwordResetEmail
}

export default FirebaseAuthService;