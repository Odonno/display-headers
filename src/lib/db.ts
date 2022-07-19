import type { Header, Invocation } from './models';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getFirestore,
	onSnapshot
} from 'firebase/firestore';
import { app } from './app';
import { dev } from '$app/env';
import { Observable } from 'rxjs';

const collectionName = dev ? 'invocations-dev' : 'invocations';

export const watchInvocations = () => {
	return new Observable<Invocation[]>((observer) => {
		const db = getFirestore(app);
		const collectionRef = collection(db, collectionName);

		const subscription = onSnapshot(collectionRef, (querySnapshot) => {
			const array: Invocation[] = [];

			querySnapshot.forEach((doc) => {
				const invocation = {
					id: doc.id,
					...doc.data()
				} as Invocation;

				array.push(invocation);
			});

			array.sort((a, b) => b.timestamp - a.timestamp);

			observer.next(array);
		});

		return () => subscription();
	});
};

export const getInvocation = async (id: string) => {
	const db = getFirestore(app);
	const docRef = doc(db, collectionName, id);
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		return {
			id: docSnapshot.id,
			...docSnapshot.data()
		} as Invocation;
	}

	return undefined;
};

export const addInvocation = (headers: Header[]) => {
	const db = getFirestore(app);
	const collectionRef = collection(db, collectionName);

	return addDoc(collectionRef, {
		timestamp: new Date().getTime(),
		headers
	});
};

export const deleteAllInvocations = (invocations: Invocation[]) => {
	const db = getFirestore(app);

	const promises: Promise<void>[] = [];

	invocations.forEach((invocation) => {
		const docRef = doc(db, collectionName, invocation.id);
		promises.push(deleteDoc(docRef));
	});

	return Promise.all(promises);
};
