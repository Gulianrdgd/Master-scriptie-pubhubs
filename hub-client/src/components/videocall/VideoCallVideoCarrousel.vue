<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import VideoCallVideo from "@/components/videocall/videoCallVideo.vue";
import {computed} from "vue";

const props = defineProps<{
  remoteParticipants: [string, RemoteParticipant][];
}>();

const filteredRemotes = computed(() => {
  return props.remoteParticipants.filter(([_, participant]) => {
    return participant.getTrackPublications().length > 0;
  });
});

function getTrackIds(participant: RemoteParticipant){
  const ids = participant.getTrackPublications().map((p) => p.trackSid + p.isSubscribed + p.isMuted + p.kind + p.trackName);
  const random_val = Math.random();
  return ids.join('-') + `-${random_val}`;
}
</script>

<template>
  <div v-if="filteredRemotes.length === 0">
    <p>Nobody is here yet</p>
  </div>
  <div v-for="([username, participant]) in filteredRemotes" :key="username + getTrackIds(participant)" class="w-full h-full flex items-center justify-center">
      <VideoCallVideo :username="username" :remoteParticipant="participant"/>
  </div>
</template>

<style scoped>

</style>