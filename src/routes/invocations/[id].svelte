<script lang="ts">
	import { app } from '$lib/app';
	import { onMount } from 'svelte';
	import { doc, getDoc, getFirestore } from 'firebase/firestore';
	import { page } from '$app/stores';

	type Header = { key: string; value: string };
	type Invocation = {
		id: string;
		timestamp: number;
		headers: Header[];
	};

	let invocation: Invocation | undefined;

	onMount(async () => {
		const db = getFirestore(app);

		const docRef = doc(db, 'invocations', $page.params.id);
		const docSnapshot = await getDoc(docRef);

		if (docSnapshot.exists()) {
			invocation = {
				id: docSnapshot.id,
				...docSnapshot.data()
			} as Invocation;
		}
	});

	const goBack = () => {
		window.history.back();
	};
</script>

<button type="button" on:click={goBack}>Go back</button>

{#if invocation}
	<table>
		<thead>
			<tr>
				<th>Header</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{#each invocation.headers as { key, value }}
				<tr>
					<td>{key}</td>
					<td>{value}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
