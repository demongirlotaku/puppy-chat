import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import { getStorage } from "firebase-admin/storage"
import { FIREBASE } from "@src/settings";

const firebaseConfig = {
  apiKey: FIREBASE.apiKey,
  authDomain: FIREBASE.authDomain,
  projectId: FIREBASE.projectId,
  storageBucket: FIREBASE.storageBucket,
  messagingSenderId: FIREBASE.messagingSenderId,
  appId: FIREBASE.appId,
  measurementId: FIREBASE.measurementId 
};

const firebaseApp = initializeApp(firebaseConfig);

const fbDB = getFirestore(firebaseApp)
const fbAuth = getAuth(firebaseApp)
const fbStorage = getStorage(firebaseApp)

export { fbDB, fbAuth, fbStorage }