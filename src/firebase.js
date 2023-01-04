import firebase from 'firebase/compat/app';
import {getStorage} from 'firebase/storage'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCvd3YqDppwfz8I0YhYhOxGOFJ_paheuWc",
    authDomain: "front-end-8a283.firebaseapp.com",
    projectId: "front-end-8a283",
    storageBucket: "front-end-8a283.appspot.com",
    messagingSenderId: "355889837337",
    appId: "1:355889837337:web:17e29b1a96752103918188"
  };

 const firebaseApp = firebase.initializeApp(firebaseConfig)
 export const db = firebaseApp.firestore();
//  const auth = firebase.auth();
const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp)


  export { auth };