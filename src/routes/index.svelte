<script lang="ts">
	import { app } from '$lib/app';
	import { onDestroy, onMount } from 'svelte';
	import { collection, getFirestore, onSnapshot, type Unsubscribe } from 'firebase/firestore';

	type Header = { key: string; value: string };
	type Invocation = {
		id: string;
		timestamp: number;
		headers: Header[];
	};

	let invocations: Invocation[] = [];

	let subscription: Unsubscribe | undefined;

	onMount(async () => {
		const db = getFirestore(app);

		const collectionRef = collection(db, 'invocations');

		subscription = onSnapshot(collectionRef, (querySnapshot) => {
			let tmp: Invocation[] = [];
			querySnapshot.forEach((doc) => {
				const invocation = {
					id: doc.id,
					...doc.data()
				} as Invocation;

				tmp.push(invocation);
			});

			invocations = tmp.sort((a, b) => b.timestamp - a.timestamp);
		});
	});

	onDestroy(() => {
		subscription?.();
	});
</script>

<ul>
	{#each invocations as invocation (invocation.id)}
		<li>
			<a href={`/invocations/${invocation.id}`}>
				<b>{new Date(invocation.timestamp).toLocaleString()}</b>
				<div>{invocation.headers.length} headers</div>
			</a>
		</li>
	{/each}
</ul>
