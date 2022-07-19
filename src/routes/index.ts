import { dev } from '$app/env';
import { app } from '$lib/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const currentReferer = dev ? 'http://127.0.0.1:5173/' : 'https://vercel.com/';

export const GET = async ({ request }) => {
	type Header = { key: string; value: string };
	const headers: Header[] = [];

	for (const [key, value] of request.headers) {
		headers.push({ key, value });
	}

	const refererHeader = headers.find(({ key }) => key.toLowerCase() === 'referer');

	if (refererHeader?.value !== currentReferer) {
		const db = getFirestore(app);
		await addDoc(collection(db, 'invocations'), {
			timestamp: new Date().getTime(),
			headers
		});
	}

	return {
		body: {}
	};
};
