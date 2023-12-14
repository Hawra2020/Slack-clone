import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDt1PvJZBNQwg5IwPQFSum5VwSNOG6xVBU",
  authDomain: "slack-clone-portfolio-bc2f0.firebaseapp.com",
  projectId: "slack-clone-portfolio-bc2f0",
  storageBucket: "slack-clone-portfolio-bc2f0.appspot.com",
  messagingSenderId: "827250420382",
  appId: "1:827250420382:web:f424a0701cc08cc257698f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


export { auth, provider, db};

