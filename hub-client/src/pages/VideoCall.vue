<script setup lang="ts">

import Dropdown from "@/components/forms/Dropdown.vue";
import {Options} from '@/composables/useFormInputEvents';
import {onMounted, ref} from "vue";
import {Room as LivekitRoom} from "livekit-client";
import VideoCallPreview from "@/components/ui/VideoCallPreview.vue";
import useVideoCall from "@/store/videoCall";
import Button from "@/components/elements/Button.vue";
import {useRouter} from "vue-router";
import VideoCallBottomBar from "@/components/videocall/videoCallBottomBar.vue";
import VideoCallVideoCarrousel from "@/components/videocall/VideoCallVideoCarrousel.vue";
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";

let audioOptions = ref<Options>([]);
let videoOptions = ref<Options>([]);
const videoCall = useVideoCall();
const router = useRouter();

let connectInputs = ref(false);


async function findDevices() {
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
}

function syncRemoteParticipants(){
  const temp: [string, RemoteParticipant][] = [];

  videoCall.livekit_room?.remoteParticipants.forEach((p) => {
    // @ts-expect-error: Ref error that we have everywhere
    temp.push([p.identity, p]);
  });
  remotes.value = temp;
}

onMounted(async () => {
  await findDevices();

  if(!videoCall.livekit_room){
    return;
  }
  syncRemoteParticipants();

  videoCall.livekit_room.removeAllListeners();

  videoCall.livekit_room.on('participantConnected', syncRemoteParticipants);
  videoCall.livekit_room.on('participantDisconnected', syncRemoteParticipants);
  videoCall.livekit_room.on('localTrackPublished', syncRemoteParticipants);
  videoCall.livekit_room.on('trackPublished', syncRemoteParticipants);
  videoCall.livekit_room.on('localTrackUnpublished', syncRemoteParticipants);
  videoCall.livekit_room.on('trackUnpublished', syncRemoteParticipants);

});


function goBack(){
  router.back();
}

function joinRoom(){
  connectInputs.value = true;
  videoCall.togglePublishTracks(true);
  syncRemoteParticipants();
}

let remotes = ref<[string, RemoteParticipant][]>([]);


</script>

<template>
  <div class="w-full h-full dark:bg-gray-middle">
    <div v-if="!connectInputs" class="flex flex-col justify-center items-center h-full dark:text-white">
      <h1 class="text-6xl font-bold mb-8">Starting video call</h1>
      <div class="text-center flex items-center justify-center flex-col">
        <VideoCallPreview/>
        <div class="flex justify-center items-center w-1/2">
          <div class="mx-2 w-1/2">
            <h2>Microphone source</h2>
            <Dropdown value="" :options="audioOptions" :on-select="(audioDevice: string) => {
              videoCall.changeAudioDevice(audioDevice);
            }" />
          </div>
          <div class="mx-2 w-1/2">
            <h2>Video source</h2>
            <Dropdown value="" :options="videoOptions" :on-select="(videoDevice: string) => {
              videoCall.changeVideoDevice(videoDevice);
            }" />
          </div>
        </div>
        <div class="flex gap-2 pt-2 justify-center">
        <Button @click="joinRoom">Join</Button>
         <Button @click="findDevices">Refresh devices</Button>
        <Button @click="goBack">Exit</Button>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center h-full dark:text-white">
        <VideoCallVideoCarrousel :remote-participants="remotes"/>
        <VideoCallBottomBar/>
  </div>
  </div>
</template>

<style scoped>

</style>