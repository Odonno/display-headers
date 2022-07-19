export const GET = async ({ request }) => {
	type Header = { key: string; value: string };
	const headers: Header[] = [];

	for (const [key, value] of request.headers) {
		headers.push({ key, value });
	}

	return {
		body: {
			headers
		}
	};
};
