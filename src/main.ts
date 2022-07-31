import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWKrRhC3wVAiUwNWqKPb05LsDfG-eu-Tw",
  authDomain: "secrets-9b453.firebaseapp.com",
  projectId: "secrets-9b453",
  storageBucket: "secrets-9b453.appspot.com",
  messagingSenderId: "123697413212",
  appId: "1:123697413212:web:5851847ecd76dc33773a99",
  measurementId: "G-ENXLSVD9PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
