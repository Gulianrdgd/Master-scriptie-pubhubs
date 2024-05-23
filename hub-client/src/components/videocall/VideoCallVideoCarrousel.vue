<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import VideoCallVideo from "@/components/videocall/videoCallVideo.vue";

const props = defineProps<{
  remoteParticipants: [string, RemoteParticipant][];
}>();


function getTrackIds(participant: RemoteParticipant){
  const ids = participant.getTrackPublications().map((p) => p.trackSid + p.isSubscribed + p.isMuted + p.kind + p.trackName);
  const random_val = Math.random();
  return ids.join('-') + `-${random_val}`;
}

function getSize(){
  if(props.remoteParticipants.length === 1){
    return 'w-5/12';
    // return 'w-11/12';
  }

  if( props.remoteParticipants.length > 1 && props.remoteParticipants.length < 5 ){
    return 'w-5/12';
  }

  return 'w-1/5';
}

</script>

<template>
  <div v-if="props.remoteParticipants.length === 0">
    <p>Nobody is here yet</p>
  </div>
  <div  v-if="props.remoteParticipants.length < 5" class="w-full h-9/12 transition-all">
    <div v-for="([username, participant]) in props.remoteParticipants" :key="username + getTrackIds(participant)" class=" flex flex-wrap items-center justify-center transition-all" >
        <VideoCallVideo :username="username" :remoteParticipant="participant" :size="getSize()"/>
    </div>
  </div>
  <!--  Here we should have a setup with a carousel on top and one person who is speaking ... Ugh this will take a lot of time -->
  <div v-if="props.remoteParticipants.length >= 5">
    <div v-for="([username, participant]) in props.remoteParticipants" :key="username + getTrackIds(participant)" class="w-full h-9/12 flex flex-wrap items-center justify-center">
      <VideoCallVideo :username="username" :remoteParticipant="participant" :size="getSize()"/>
    </div>
  </div>
</template>

<style scoped>

</style>