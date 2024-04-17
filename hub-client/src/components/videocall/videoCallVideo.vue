<script setup lang="ts">
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";
import { ref, watch} from "vue";
import {Track} from "livekit-client";
import Icon from "@/components/elements/Icon.vue";
import UserDisplayName from "@/components/rooms/UserDisplayName.vue";

const props = defineProps<{
  username: string;
  remoteParticipant: RemoteParticipant;
}>();


const noVideoTrack = ref(true);
const videoEl = ref<HTMLVideoElement | null>(null);
const audioEl = ref<HTMLAudioElement | null>(null);

watch([props.remoteParticipant, videoEl, audioEl], ([remote, videoElement, audioElement]) => {
  if(!videoElement){
    return;
  }

  const audioTrack = remote.getTrackPublication(Track.Source.Microphone)?.track;
  console.log("audio track", audioTrack, audioElement)
  if (audioElement && audioTrack) {
    audioTrack.attach(audioElement);
  }

  const videoTrack = remote.getTrackPublication(Track.Source.Camera)?.track;

  noVideoTrack.value = !videoTrack;

  if (videoElement && videoTrack) {
    console.log("attaching video track", videoTrack);
    videoTrack.attach(videoElement);
  }
  if(!videoElement && videoTrack) {
    videoTrack.detach();
  }

}, {deep: true});
</script>

<template>
  <div class="bg-black rounded-md p-2 flex flex-col w-1/2 justify-center">
  <UserDisplayName class="text-xl" :user="username" />
    <div>
  <video
      :class="['aspect-video', 'self-center', 'w-full','h-full', 'bg-black', noVideoTrack? 'hidden' : '']"
      ref="videoEl"
      muted
      tabIndex={-1}
  />
      <audio ref="audioEl" autoplay />
      <div v-if="noVideoTrack" class="aspect-video w-full h-full bg-black">
        <Icon type="nocamerauser" class="text-white w-full h-full"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>