<script setup lang="ts">
  import useVideoCall from "@/store/videoCall";
  import {useRouter} from "vue-router";

  const videoCall = useVideoCall();
  const router = useRouter();

  function leaveCall(){
    videoCall.leaveCall();
    router.back();
  }

function endCall(){
  videoCall.endCall();
  router.back();

}

function printRemote(){
  console.log("remoteParticipants", videoCall.livekit_room?.remoteParticipants)
}


</script>

<template>
  <div class="w-9/12 h-20 bg-white flex items-center justify-between px-4 bottom-0 fixed">
    <div class="flex items-center space-x-4">
      <button class="bg-red text-white px-4 py-2 rounded-full" @click="endCall">End call</button>
      <button class="bg-avatar-orange text-white px-4 py-2 rounded-full" @click="leaveCall">Leave call</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full">Mute</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="printRemote">Video</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="() => {videoCall.livekit_room?.simulateParticipants({participants:
      {count: 1, audio: true, video: true}
      })}">Simulate remotes</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="() => {
        const otherParticipant = videoCall.livekit_room?.remoteParticipants.keys().next();

        if(otherParticipant && otherParticipant.value){
                videoCall.matrix_key_provider?.ratchetKey(otherParticipant.value as string)
        }
}">Ratchet key</button>
      
    </div>
    <div class="flex items-center space-x-4">
      <button class="bg-blue text-white px-4 py-2 rounded-full">Participants</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full">Settings</button>
    </div>
  </div>
</template>

<style scoped>

</style>