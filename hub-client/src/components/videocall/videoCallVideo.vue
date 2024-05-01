<script setup lang="ts">
import {onUpdated, ref, watch} from "vue";
import {Track} from "livekit-client";
import Icon from "@/components/elements/Icon.vue";
import UserDisplayName from "@/components/rooms/UserDisplayName.vue";
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";

const props = defineProps<{
  username: string;
  remoteParticipant: RemoteParticipant;
}>();

const videoEl = ref<HTMLVideoElement | null>(null);
const audioEl = ref<HTMLAudioElement | null>(null);

onUpdated(() => {
  // console.log("Video update", props.remoteParticipant, props.remoteParticipant.getTrackPublications().length );
});

const noVideoTrack = ref(false);

watch([props.remoteParticipant, videoEl, audioEl], ([remote, videoElement, audioElement]) => {
  // console.log("Changed props!");
  if(!(videoElement && audioElement)){
    console.log("Not all elements are ready");
    return;
  }

  const remotes_tracks = remote.getTrackPublications();
  // console.log(remote.getTrackPublications());
  const audioTracks = remotes_tracks.filter((t) => t.source === Track.Source.Microphone)
  // console.log("audio tracks", audioTracks);
  if (audioElement && audioTracks.length > 0) {
    audioTracks[0].track?.attach(audioElement);
  }

  const videoTracks = remotes_tracks.filter((t) => t.source === Track.Source.Camera)

  noVideoTrack.value = videoTracks.length === 0;
  // console.log("video track", videoTracks);

  if (videoElement && videoTracks.length > 0) {
    // console.log("attaching video track", videoTracks[0]);
    videoTracks[0].track?.attach(videoElement);
    
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