<script lang="ts">
	type Header = { key: string; value: string };

	export let headers: Header[];
</script>

<table>
	<thead>
		<tr>
			<th>Header</th>
			<th>Value</th>
		</tr>
	</thead>
	<tbody>
		{#each headers as { key, value }}
			<tr>
				<td>{key}</td>
				<td>{value}</td>
			</tr>
		{/each}
	</tbody>
</table>
