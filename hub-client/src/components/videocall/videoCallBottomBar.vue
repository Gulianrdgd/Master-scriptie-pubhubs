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

</script>

<template>
  <div class="w-9/12 h-20 bg-white flex items-center justify-between px-4 bottom-0 fixed">
    <div class="flex items-center space-x-4">
      <button class="bg-red text-white px-4 py-2 rounded-full" @click="endCall">End call</button>
      <button class="bg-avatar-orange text-white px-4 py-2 rounded-full" @click="leaveCall">Leave call</button>
      <button class="bg-blue text-white px-4 py-2 rounded-full">Mute</button>
    </div>
  </div>
</template>

<style scoped>

</style>