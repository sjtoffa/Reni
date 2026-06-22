import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ2uIyVG7ItqlMpKsgHWsQkmGqipKIH-g',
  authDomain: 'reni-12bfe.firebaseapp.com',
  projectId: 'reni-12bfe',
  storageBucket: 'reni-12bfe.firebasestorage.app',
  messagingSenderId: '722270761709',
  appId: '1:722270761709:web:97b15910de598fd73852e4',
  measurementId: 'G-G11ECMJBW8',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
