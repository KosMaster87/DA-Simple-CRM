import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyDSkUDNqSGtGmFC1nLa0yoIEaFlLg44iRI',
  authDomain: 'simple-crm-8e638.firebaseapp.com',
  projectId: 'simple-crm-8e638',
  storageBucket: 'simple-crm-8e638.firebasestorage.app',
  messagingSenderId: '155299771921',
  appId: '1:155299771921:web:1329d40a47d9741b22e3b0',
};
const app = initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),

    provideFirebaseApp(() => app), // Firebase-Initialisierung einbinden
    provideFirestore(() => getFirestore()), // Firestore-Dienst bereitstellen
  ],
};
