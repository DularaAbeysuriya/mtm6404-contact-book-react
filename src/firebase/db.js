import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//  Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCuUR9whlsNwF9DBt4A7gBMLAXWYRBquwE",
  authDomain: "mtm6404-contact-book-rea-3a206.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-3a206",
  storageBucket: "mtm6404-contact-book-rea-3a206.appspot.com",
  messagingSenderId: "787741132290",
  appId: "1:787741132290:web:145116dcc5c6b29f58891b",
  measurementId: "G-027JY6SGP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
