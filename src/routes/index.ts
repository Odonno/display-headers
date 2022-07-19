import { dev } from '$app/env';
import { addInvocation } from '$lib/db';
import type { Header } from '$lib/models';

const currentReferer = dev ? 'http://127.0.0.1:5173/' : 'https://vercel.com/';

export const GET = async ({ request }) => {
	const headers: Header[] = [];

	for (const [key, value] of request.headers) {
		headers.push({ key, value });
	}

	const refererHeader = headers.find(({ key }) => key.toLowerCase() === 'referer');

	if (refererHeader?.value !== currentReferer) {
		await addInvocation(headers);
	}

	return {
		body: {}
	};
};
