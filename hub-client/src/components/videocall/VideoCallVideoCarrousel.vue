<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import VideoCallVideo from "@/components/videocall/videoCallVideo.vue";

const props = defineProps<{
  remoteParticipants: Map<string, RemoteParticipant>;
}>();
</script>

<template>
  <div v-for="participant in props.remoteParticipants">
    <VideoCallVideo remoteParticipant="participant"/>
  </div>

</template>

<style scoped>

</style>