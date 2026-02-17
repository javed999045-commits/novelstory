
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, type Auth } from 'firebase/auth';

// IMPORTANT: Replace with your actual configuration from your Firebase project
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Only initialize on the client-side to prevent build errors.
if (typeof window !== 'undefined') {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    
    // Handle email link sign-in on app load
    if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (email) {
            signInWithEmailLink(auth, email, window.location.href)
                .catch((error) => {
                    console.error("Failed to sign in with email link", error);
                });
        }
    }
  } else {
      console.warn("Firebase is not configured. Please add your Firebase credentials to the .env file. Auth features will be disabled.");
  }
}

export { app, auth };
