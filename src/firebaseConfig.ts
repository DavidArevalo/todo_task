import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {
  auth,
  provider,
  db,
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  firebase,
  firebaseConfig,
  storage,
  setDoc,
  doc,
  Timestamp,
};
