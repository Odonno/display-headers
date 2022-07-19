<script lang="ts">
	import { app } from '$lib/app';
	import { onDestroy, onMount } from 'svelte';
	import {
		collection,
		deleteDoc,
		doc,
		getFirestore,
		onSnapshot,
		type Unsubscribe
	} from 'firebase/firestore';

	type Header = { key: string; value: string };
	type Invocation = {
		id: string;
		timestamp: number;
		headers: Header[];
	};

	let invocations: Invocation[] = [];

	let subscription: Unsubscribe | undefined;

	const db = getFirestore(app);
	const collectionRef = collection(db, 'invocations');

	onMount(async () => {
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

	const onClearButton = () => {
		invocations.forEach((invocation) => {
			const docRef = doc(db, 'invocations', invocation.id);
			deleteDoc(docRef);
		});
	};
</script>

<button type="button" on:click={onClearButton}>Clear all invocations</button>

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
