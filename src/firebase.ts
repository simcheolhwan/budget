import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const config = {
  apiKey: "AIzaSyB4oXLQeja9UJsgoqcmair2HOoRhfTEZnM",
  authDomain: "housekeeping-2023.firebaseapp.com",
  databaseURL: "https://housekeeping-2023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "housekeeping-2023",
  storageBucket: "housekeeping-2023.appspot.com",
  messagingSenderId: "724262393503",
  appId: "1:724262393503:web:c28d3f4d33b727ae6874aa",
}

const app = initializeApp(config)
export const auth = getAuth(app)
export const db = getDatabase(app)
