import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth,setPersistence,browserLocalPersistence} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase for SSR
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase services
const firestore = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
auth.setPersistence(browserLocalPersistence);


console.log(auth);
console.log(firebaseApp);

// Expose the instances we'll need
export { firebaseApp, firestore, auth }