<script setup lang="ts">

import Dropdown from "@/../../hub-client/src/components/forms/Dropdown.vue";
import {Options} from '@/../../hub-client/src/composables/useFormInputEvents';
import {onMounted, ref} from "vue";
import {Room as LivekitRoom} from "livekit-client";
import VideoCallPreview from "@/components/ui/VideoCallPreview.vue";
import useVideoCall from "@/store/videoCall";

let audioOptions = ref<Options>([]);
let videoOptions = ref<Options>([]);
const videoCall = useVideoCall();

onMounted(async () => {

  const audioDevices = await LivekitRoom.getLocalDevices('audioinput');

  // @ts-ignore
  audioOptions.value = audioDevices.map((device) => {
    return {label: device.label, value: device.deviceId};
  });

  const videoDevices = await LivekitRoom.getLocalDevices('videoinput');

  // @ts-ignore
  videoOptions.value = videoDevices.map((device) => {
    return {label: device.label, value: device.deviceId};
  });
});

</script>

<template>
  <div class="w-full h-full bg-avatar-orange">
    <div class="flex justify-center items-center h-screen dark:text-white p-10">
      <div class="text-center flex items-center justify-center flex-col">
        <h1 class="text-6xl font-bold mb-8">Starting video call</h1>
        <VideoCallPreview class="w-3/5 bg-black"/>
        <div class="flex justify-center items-center">
          <div class="px-2 max-w-52">
            <h2>Microphone source</h2>
            <Dropdown value="" :options="audioOptions" :on-select="(audioDevice: string) => {
              console.log(audioDevice);
              videoCall.changeAudioDevice(audioDevice);
            }" />
          </div>
          <div class="px-2 max-w-52">
            <h2>Video source</h2>
            <Dropdown value="" :options="videoOptions" :on-select="(videoDevice: string) => {
              console.log(videoDevice);
              videoCall.changeVideoDevice(videoDevice);
            }" />
          </div>
        </div>
        <router-link :to="{ name: 'home' }"><Button>Go back</Button></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>