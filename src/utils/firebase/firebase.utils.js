// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa9KovRPlDRLFuSjNoPiMZYp0VBzhEk8w",
  authDomain: "crwn-clothing-db-d90bf.firebaseapp.com",
  projectId: "crwn-clothing-db-d90bf",
  storageBucket: "crwn-clothing-db-d90bf.appspot.com",
  messagingSenderId: "211343806170",
  appId: "1:211343806170:web:a4c9580b52bf43d9209fe3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid); 

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log('error', error.message);
      }
    }  
    return userDocRef;
};
