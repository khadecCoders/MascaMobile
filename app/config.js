// Optionally import the services that you want to use
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD_OlokYpjtH3um_B-Yrd21eWi6hueT2Io",
  authDomain: "cakedaypro-9bbfc.firebaseapp.com",
  databaseURL: "https://cakedaypro-9bbfc-default-rtdb.firebaseio.com",
  projectId: "cakedaypro-9bbfc",
  storageBucket: "cakedaypro-9bbfc.firebasestorage.app",
  messagingSenderId: "2238032113",
  appId: "1:2238032113:web:5420b75d831c47c82d6150",
  measurementId: "G-NRJRNE5145"
};
  
// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getDatabase(app);
// const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider(app);

export { auth, db, storage, provider };