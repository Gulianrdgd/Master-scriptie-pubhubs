<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import VideoCallVideo from "@/components/videocall/videoCallVideo.vue";

const props = defineProps<{
  remoteParticipants: [string, RemoteParticipant][];
}>();

</script>

<template>
  <div v-for="([username, participant], index) in props.remoteParticipants" :key="index + JSON.stringify(participant)" class="bg-avatar-yellow w-full h-full flex items-center justify-center">
    <VideoCallVideo :username="username" :remoteParticipant="participant"/>
  </div>
</template>

<style scoped>

</style>