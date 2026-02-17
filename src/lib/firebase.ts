
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

// IMPORTANT: Replace with your actual configuration from your Firebase project
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Handle email link sign-in on app load
if (typeof window !== 'undefined' && isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened a link on a different device. To prevent session fixation
      // attacks, ask the user to provide the email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    if (email) {
        signInWithEmailLink(auth, email, window.location.href)
            .catch((error) => {
                console.error("Failed to sign in with email link", error);
            });
    }
}


export { app, auth };
