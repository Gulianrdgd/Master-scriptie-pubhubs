<script setup lang="ts">
import {ref, watch} from "vue";
import {Track} from "livekit-client";
import Icon from "@/components/elements/Icon.vue";
import UserDisplayName from "@/components/rooms/UserDisplayName.vue";
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";

const props = defineProps<{
  username: string;
  remoteParticipant: RemoteParticipant;
  size: string;
}>();

const videoEl = ref<HTMLVideoElement | null>(null);
const audioEl = ref<HTMLAudioElement | null>(null);

const noVideoTrack = ref(false);

watch([props.remoteParticipant, videoEl, audioEl], ([remote, videoElement, audioElement]) => {
  if (!(videoElement && audioElement)) {
    return;
  }

  const videoTrack = remote.getTrackPublication(Track.Source.Camera);
  const audioTrack = remote.getTrackPublication(Track.Source.Microphone);

  if (audioElement && audioTrack) {
    audioTrack.setSubscribed(true);
    audioTrack.track?.attach(audioElement);
  }

  if (videoElement && videoTrack) {
    videoTrack.setSubscribed(true);

    // I am not proud of this, but hey without it, it does not work
    setTimeout(function () {

      const temp_new_video_el = videoTrack.track?.attach(videoElement) as HTMLVideoElement | undefined;

      if (temp_new_video_el) {
        videoEl.value = temp_new_video_el;
      }
    }, 100);

    document.body.addEventListener("click", () => {
      let videoTrackNew = remote.getTrackPublication(Track.Source.Camera);

      if(!videoTrackNew){
        return;
      }

      const temp_new_video_el = videoTrackNew.track?.attach(videoElement) as HTMLVideoElement | undefined;
      if (temp_new_video_el) {
        videoEl.value = temp_new_video_el;
      }

    }, {once: true})

    noVideoTrack.value = false;
  } else {
    noVideoTrack.value = true;
  }

}, {deep: true});

</script>

<template>
  <div class='bg-black rounded-md p-2 flex flex-col justify-center aspect-video m-2' :class="props.size">
    <UserDisplayName class="text-xl" :user="username"/>
    <div>
      <video
          :class="['aspect-video', 'self-center', 'w-full','h-full', 'bg-black', noVideoTrack? 'hidden' : '']"
          ref="videoEl"
          playsInline
          preload="auto"
          tabIndex={-1}
          autoplay
          muted
          disablepictureinpicture="true"
      />
      <audio ref="audioEl" autoplay/>
      <div v-if="noVideoTrack" class="aspect-video w-full h-full bg-black">
        <Icon type="nocamerauser" class="text-white w-full h-full"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>