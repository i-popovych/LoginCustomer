import { getApps, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGa99GQeBBQ9o3J9e9mXb8a_HJ59jKBpI",
  authDomain: "authenticationmodule-e2209.firebaseapp.com",
  projectId: "authenticationmodule-e2209",
  storageBucket: "authenticationmodule-e2209.appspot.com",
  messagingSenderId: "184888307826",
  appId: "1:184888307826:web:68a8825f89e00dc72952eb"
};
// Initialize Firebase
const firebaseApp =
  // create a new app only if it doesn't already exists
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const auth = getAuth(firebaseApp);
auth.languageCode = 'it';

export const db = getFirestore(firebaseApp);

  
export default firebaseApp;