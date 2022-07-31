import firebase from "firebase";
// import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDXMCkevl-8kjNhS7HvSk8MdkrX64xslP4",
    authDomain: "react-native-instagam-clone.firebaseapp.com",
    projectId: "react-native-instagam-clone",
    storageBucket: "react-native-instagam-clone.appspot.com",
    messagingSenderId: "141341999318",
    appId: "1:141341999318:web:ddb7896a656802511c4977",
};

// const app = initializeApp(firebaseConfig);

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
export const auth = getAuth(app);
