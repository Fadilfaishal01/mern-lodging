import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
	authDomain: "mern-lodging.firebaseapp.com",
	projectId: "mern-lodging",
	storageBucket: "mern-lodging.appspot.com",
	messagingSenderId: "596842425004",
	appId: "1:596842425004:web:51c5b431df8046f3f78d09",
};

export const app = initializeApp(firebaseConfig);
