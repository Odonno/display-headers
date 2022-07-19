<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Invocation } from '$lib/models';
	import { getInvocation } from '$lib/db';

	let invocation: Invocation | undefined;

	onMount(async () => {
		invocation = await getInvocation($page.params.id);
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
