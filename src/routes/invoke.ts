import { dev } from '$app/env';
import { addInvocation } from '$lib/db';
import type { Header } from '$lib/models';

const excludedReferers = dev
	? ['http://127.0.0.1:5173/']
	: ['https://vercel.com/', 'https://display-headers.vercel.app/'];

const excludedUserAgents = [/Vercelbot/i, /github.com\/sindresorhus\/got/i, /^node-fetch$/i];

export const GET = async ({ request }) => {
	const headers: Header[] = [];

	for (const [key, value] of request.headers) {
		headers.push({ key, value });
	}

	const refererHeader = headers.find(({ key }) => key.toLowerCase() === 'referer');
	const isRefererExcluded = excludedReferers.some(
		(excludedReferer) => refererHeader?.value === excludedReferer
	);

	const userAgentHeader = headers.find(({ key }) => key.toLowerCase() === 'user-agent');
	const isUserAgentExcluded = excludedUserAgents.some((excludedUserAgent) =>
		userAgentHeader?.value.match(excludedUserAgent)
	);

	const shouldAddInvocation = !isRefererExcluded && !isUserAgentExcluded;

	if (shouldAddInvocation) {
		await addInvocation(headers);
	}

	return {
		body: {}
	};
};
