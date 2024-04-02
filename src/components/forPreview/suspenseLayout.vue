<template>
	<Suspense>
		<router-view />
	</Suspense>
	<!-- <showSrcBtn />
	<referenceSource />
	<FPSGraph /> -->
</template>
<script setup lang="ts">
import showSrcBtn from "./showSrcBtn.vue"
import referenceSource from "./referenceSource.vue"
import FPSGraph from "./FPSGraph.vue"
</script>