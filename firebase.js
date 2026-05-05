// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your config (keep yours as-is)
const firebaseConfig = {
  apiKey: "AIzaSyBa-nVzBf6tQ1VepPtyLFe58USHagyuDJo",
  authDomain: "virtual-wardrobe-e3582.firebaseapp.com",
  projectId: "virtual-wardrobe-e3582",
  storageBucket: "virtual-wardrobe-e3582.firebasestorage.app",
  messagingSenderId: "351346567410",
  appId: "1:351346567410:web:43ca4dd92497ee44c6886b",
  measurementId: "G-0MJT626K5S"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// ? ADD THIS (important)
export const auth = getAuth(app);