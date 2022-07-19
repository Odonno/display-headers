export type Header = { key: string; value: string };

export type Invocation = {
	id: string;
	timestamp: number;
	headers: Header[];
};
