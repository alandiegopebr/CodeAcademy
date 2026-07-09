import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
};

function hasValidConfig(config: Record<string, string>) {
  return Object.values(config).every((value) => typeof value === 'string' && value.trim() !== '');
}

const app: FirebaseApp | null = hasValidConfig(firebaseConfig)
  ? !getApps().length
    ? initializeApp(firebaseConfig)
    : getApps()[0]
  : null;

export const isFirebaseConfigured = Boolean(app);
export const auth: Auth | null = app ? getAuth(app) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;

export function getFirebaseAuth() {
  if (!auth) {
    throw new Error('Firebase Auth is not configured.');
  }
  return auth;
}

export function getFirebaseDb() {
  if (!db) {
    throw new Error('Firebase Firestore is not configured.');
  }
  return db;
}
