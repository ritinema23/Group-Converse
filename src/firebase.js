import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCqMnRghkYWfAvCsx8rQBJxtmBE9If6BLk",
    authDomain: "whats-app-clone-9ec0e.firebaseapp.com",
    databaseURL: "https://whats-app-clone-9ec0e.firebaseio.com",
    projectId: "whats-app-clone-9ec0e",
    storageBucket: "whats-app-clone-9ec0e.appspot.com",
    messagingSenderId: "252968078305",
    appId: "1:252968078305:web:afa636ed456a8a64b3e0a0",
    measurementId: "G-RT24G1VBWY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider} ;
  export default db;