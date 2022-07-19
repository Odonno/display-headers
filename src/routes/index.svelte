<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Invocation } from '$lib/models';
	import { deleteAllInvocations, watchInvocations } from '$lib/db';
	import type { Subscription } from 'rxjs';

	let invocations: Invocation[] = [];
	let subscription: Subscription | undefined;

	onMount(async () => {
		subscription = watchInvocations().subscribe((data) => {
			invocations = data;
		});
	});

	onDestroy(() => {
		subscription?.unsubscribe();
	});

	const onClearButton = async () => {
		await deleteAllInvocations(invocations);
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
