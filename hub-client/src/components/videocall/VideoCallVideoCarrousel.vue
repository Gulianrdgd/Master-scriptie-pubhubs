<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import VideoCallVideo from "@/components/videocall/videoCallVideo.vue";
import {onUpdated} from "vue";

const props = defineProps<{
  remoteParticipants: [string, RemoteParticipant][];
}>();

onUpdated(() => {
  console.log("Caroussel update, remoteParticipants", props.remoteParticipants)
})

for (const [username, participant] of props.remoteParticipants) {
  console.log("Participant username", username, participant,username + JSON.stringify(participant.getTrackPublications()));
}

</script>

<template>
  <div v-if="props.remoteParticipants.length === 0">
    <p>Nobody is here yet</p>
  </div>
    <div v-for="([username, participant]) in props.remoteParticipants" :key="username + participant.sid" class="w-full h-full flex items-center justify-center">
      <VideoCallVideo :username="username" :remoteParticipant="participant"/>
  </div>
</template>

<style scoped>

</style>