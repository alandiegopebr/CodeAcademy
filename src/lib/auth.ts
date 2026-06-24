import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

const SESSION_COOKIE = 'codeacademy_session';

function setSessionCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${60 * 60}; SameSite=Lax`;
  }
}

function clearSessionCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export async function signIn(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  setSessionCookie();
  return result;
}

export async function register(email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  setSessionCookie();
  return result;
}

export async function forgotPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function signOut() {
  await firebaseSignOut(auth);
  clearSessionCookie();
}
