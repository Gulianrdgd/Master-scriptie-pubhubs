<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import VideoCallVideo from "@/components/videocall/videoCallVideo.vue";
import {onUpdated} from "vue";

const props = defineProps<{
  remoteParticipants: [string, RemoteParticipant][];
}>();

onUpdated(() => {
  // console.log("Caroussel update, remoteParticipants", JSON.stringify(props.remoteParticipants, null, 4))
  // obj = JSON.parse(str); // Reverses above operation (Just in case if needed.)
})

// for (const [username, participant] of props.remoteParticipants) {
//   console.log("Participant username", username, participant,username + JSON.stringify(participant.getTrackPublications()));
// }

function getTrackIds(participant: RemoteParticipant){
  const ids = participant.getTrackPublications().map((p) => p.trackSid);
  console.log("Track ids", ids, participant.identity+ids.join('-'));
  const random_val = Math.random();
  return ids.join('-') + `-${random_val}`;
}

</script>

<template>
  <div v-if="props.remoteParticipants.length === 0">
    <p>Nobody is here yet</p>
  </div>
  <div v-for="([username, participant]) in props.remoteParticipants" :key="username + getTrackIds(participant)" class="w-full h-full flex items-center justify-center">
      <VideoCallVideo :username="username" :remoteParticipant="participant"/>
  </div>
</template>

<style scoped>

</style>