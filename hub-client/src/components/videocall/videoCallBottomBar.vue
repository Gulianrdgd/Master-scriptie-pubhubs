<script setup lang="ts">
  import useVideoCall from "@/store/videoCall";
  import {useRouter} from "vue-router";

  const videoCall = useVideoCall();
  const router = useRouter();

  function leaveCall(){
  console.log("end call")

    videoCall.leaveCall();
    router.back();
  }

function endCall(){
  console.log("end call")
  videoCall.endCall();
  router.back();

}

function unpublishAllTracks(){
  console.log("unpublishAllTracks")
  videoCall.togglePublishTracks(false);
}

function publishAllTracks(){
  console.log("publishAllTracks")
  videoCall.togglePublishTracks(true);
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
      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="() => {videoCall.livekit_room?.simulateParticipants({})}">Simulate remotes</button>

      <!--      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="videoCall.disable_e2ee()">Disable e2ee</button>-->
<!--      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="videoCall.enable_e2ee()">Enable e2ee</button>-->
      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="unpublishAllTracks">UnpublishAllTracks</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full" @click="publishAllTracks">publishAllTracks</button>

    </div>
    <div class="flex items-center space-x-4">
      <button class="bg-blue text-white px-4 py-2 rounded-full">Participants</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full">Settings</button>
    </div>
  </div>
</template>

<style scoped>

</style>