const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyDIhEZ11Oo7qPnwGkY5TzyuvfJliCXclXA",
    authDomain: "car-pool-pal.firebaseapp.com",
    projectId: "car-pool-pal",
    storageBucket: "car-pool-pal.appspot.com",
    messagingSenderId: "694443740794",
    appId: "1:694443740794:web:5203e3acf94d259461f5c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
