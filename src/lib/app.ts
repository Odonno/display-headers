import { initializeApp } from 'firebase/app';
import { variables } from './variables';

const firebaseConfig = {
	...variables.firebase
};

export const app = initializeApp(firebaseConfig);
