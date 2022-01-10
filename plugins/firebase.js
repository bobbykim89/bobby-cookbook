// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAjiRiFTxRwCiUl9Bkr76vgB9soOKyL7sg',
  authDomain: 'bobby-cookbook.firebaseapp.com',
  projectId: 'bobby-cookbook',
  storageBucket: 'bobby-cookbook.appspot.com',
  messagingSenderId: '201902806855',
  appId: '1:201902806855:web:377f8b4f220e7c4567de62',
  measurementId: 'G-1HQ5Z12KRV',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const auth = getAuth()
const db = getFirestore()
const storage = getStorage()

export { auth, db, storage }
