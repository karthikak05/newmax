import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDFy-elBHdIwJxIUUE7s1aaYJMofck3oIg",
  authDomain: "newmax-repair.firebaseapp.com",
  projectId: "newmax-repair",
  storageBucket: "newmax-repair.appspot.com",
  messagingSenderId: "609625582219",
  appId: "1:609625582219:web:4cb5cdd588a1a7abc8828e",
  measurementId: "G-HF81Z2Q7F0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app)

export {storage,auth}