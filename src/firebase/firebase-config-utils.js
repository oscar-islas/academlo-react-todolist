import Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAx-Tw500yhH-98n2wE0oNoXlEbrJCdZzE",
    authDomain: "todolist-7e988.firebaseapp.com",
    databaseURL: "https://todolist-7e988.firebaseio.com",
    projectId: "todolist-7e988",
    storageBucket: "todolist-7e988.appspot.com",
    messagingSenderId: "226654431172",
    appId: "1:226654431172:web:1b12f671986e5395406691"
};

Firebase.initializeApp(config);

export const firestore = Firebase.firestore();