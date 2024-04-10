<script setup lang="ts">

import Dropdown from "@/components/forms/Dropdown.vue";
import {Options} from '@/composables/useFormInputEvents';
import {onMounted, ref} from "vue";
import {Room as LivekitRoom} from "livekit-client";
import VideoCallPreview from "@/components/ui/VideoCallPreview.vue";
import useVideoCall from "@/store/videoCall";
import Button from "@/components/elements/Button.vue";

let audioOptions = ref<Options>([]);
let videoOptions = ref<Options>([]);
const videoCall = useVideoCall();

let connectInputs = ref(false);

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
    <div class="flex flex-col justify-center items-center h-screen dark:text-white p-10">
      <h1 class="text-6xl font-bold mb-8">Starting video call</h1>
      <Button v-if="!connectInputs"  @click="connectInputs = true">Enable</Button>
      <div v-if="connectInputs" class="text-center flex items-center justify-center flex-col">
        <VideoCallPreview/>
        <div class="flex justify-center items-center w-1/2">
          <div class="mx-2 w-1/2">
            <h2>Microphone source</h2>
            <Dropdown value="" :options="audioOptions" :on-select="(audioDevice: string) => {
              console.log(audioDevice);
              videoCall.changeAudioDevice(audioDevice);
            }" />
          </div>
          <div class="mx-2 w-1/2">
            <h2>Video source</h2>
            <Dropdown value="" :options="videoOptions" :on-select="(videoDevice: string) => {
              console.log(videoDevice);
              videoCall.changeVideoDevice(videoDevice);
            }" />
          </div>
        </div>
         <Button @click="() => {
           videoCall.destroyVideoCall();

         }">Exit</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>