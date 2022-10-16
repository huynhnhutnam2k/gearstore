import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAcK2LVdAhGmu-20KmSyMfDf9GCKfYyL5g",
  authDomain: "gear-store-49228.firebaseapp.com",
  projectId: "gear-store-49228",
  storageBucket: "gear-store-49228.appspot.com",
  messagingSenderId: "137874840611",
  appId: "1:137874840611:web:1208769d184aed978e2596",
  measurementId: "G-P6KX9W3WRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
