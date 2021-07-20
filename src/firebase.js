import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDjwZFvLfqOoOllbzlScRCGKl5cnIxfSYM",
  authDomain: "group-converse.firebaseapp.com",
  projectId: "group-converse",
  storageBucket: "group-converse.appspot.com",
  messagingSenderId: "345197216956",
  appId: "1:345197216956:web:1fdb91a263d3997770fcb9",
  measurementId: "G-KLTZMWZTSL"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider} ;
  export default db;