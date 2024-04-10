<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import {computed} from "vue";

const props = defineProps<{
  remoteParticipant: RemoteParticipant;
}>();

const videoTrack = computed(() => {
  const videoTracks = props.remoteParticipant.getTrackPublication()
});
</script>

<template>
  <h1>Should be video</h1>
</template>

<style scoped>

</style>