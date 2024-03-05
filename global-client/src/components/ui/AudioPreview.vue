<script setup lang="ts">
import {ref, watch} from "vue";
const props = defineProps({
  volume: { type: Number, default: 0 }
});

const bars = ref([] as boolean[]);

watch(() => props.volume, () => { // Watch for changes in the volume prop
  const barCount = Math.floor(props.volume * 10);
  bars.value = Array.from({length: 10}, (_, index) => index < barCount);
});

</script>

<template>
  <div class="flex justify-center items-center flex-row">
    <div v-for="(bar, index) in bars" :key="index" v-bind:class="'w-4 h-4 m-1 ' + (bar ? 'bg-green' : 'bg-gray')"/>
  </div>
</template>

<style scoped>

</style>