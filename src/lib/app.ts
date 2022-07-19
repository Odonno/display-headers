import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAo_Jtk55kcxoA9V5o1pDsVt6LPiL2FM3c',
	authDomain: 'display-headers.firebaseapp.com',
	projectId: 'display-headers',
	storageBucket: 'display-headers.appspot.com',
	messagingSenderId: '866477926715',
	appId: '1:866477926715:web:f468695c309758c8ee6f1e'
};

export const app = initializeApp(firebaseConfig);
