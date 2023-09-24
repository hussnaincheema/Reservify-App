import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmf3IRpYAUPNfxaVfZU9QyGAq5Sc7cv-Q",
  authDomain: "reservify-app-b28b2.firebaseapp.com",
  projectId: "reservify-app-b28b2",
  storageBucket: "reservify-app-b28b2.appspot.com",
  messagingSenderId: "621378785416",
  appId: "1:621378785416:web:c9d6cf9ed07c98f8370f3d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};