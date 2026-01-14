<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/theme";
	import "../lib/styles/global.css";

	onMount(() => {
		theme.init();
	});
</script>

<slot />
