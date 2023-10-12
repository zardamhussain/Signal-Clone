import {initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDo10ILUMd0a6BJ_DPrIj47Aq-V-PjkfYY",
    authDomain: "signal-clone-2420b.firebaseapp.com",
    projectId: "signal-clone-2420b",
    storageBucket: "signal-clone-2420b.appspot.com",
    messagingSenderId: "484855168669",
    appId: "1:484855168669:web:0ce200001d3b5b32a5de74"
};

let app;
let auth;
if(getApps.length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
}else {
  app = getApp();
}

const db = getFirestore();

export { app, auth, db };
