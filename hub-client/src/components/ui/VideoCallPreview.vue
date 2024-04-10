<script setup lang="ts">
import {computed, ref, watch} from "vue";
import useVideoCall from "@/store/videoCall";
import AudioPreview from "@/components/ui/AudioPreview.vue";

const videoEl = ref<HTMLVideoElement | null>(null);

const videoCall = useVideoCall();
const videoSource = computed(() => videoCall.video_track);
const audioSource = computed(() => videoCall.audio_track);

const averageAmount = 3;

const currentVolumeLeft = ref(0);
const currentVolumeRight = ref(0);

const currentVolumeArrayLeft = Array(averageAmount).fill(0);
const currentVolumeArrayRight = Array(averageAmount).fill(0);

let currentVolumeIndex = 0 ;

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();

watch(videoSource, (videoTrack) => {
  console.log("videoTrack", videoTrack, videoEl)
    if (videoEl.value && videoTrack) {
      videoTrack.attach(videoEl.value);
    }
    if(!videoEl.value && videoTrack) {
      videoTrack.detach();
    }
});

watch(audioSource, async (audioTrack) => {
  console.log("audioTrack", audioTrack)

  if (audioTrack) {
    // audioTrack.
    if (audioTrack.mediaStream) {
      await audioContext.audioWorklet.addModule(
          '/client/audioLevelProcessor.js'
      );
      const audioSource = audioContext.createMediaStreamSource(audioTrack.mediaStream);
      audioSource.connect(analyser);

      // TODO: Kan wat makkelijker met: https://docs.livekit.io/client-sdk-js/functions/createAudioAnalyser.html

      const node = new AudioWorkletNode(audioContext, 'audiolevel');

      node.port.onmessage = (event) => {
        if (event.data.volume as number[]) {
          if(event.data.volume.length > 0){
            currentVolumeArrayLeft[currentVolumeIndex] = event.data.volume[0].value * 10;
          }else{
            currentVolumeArrayLeft[currentVolumeIndex] = 0;
          }
          if(event.data.volume.length > 1){
            currentVolumeArrayRight[currentVolumeIndex] = event.data.volume[1].value * 10;
          }else{
            currentVolumeArrayLeft[currentVolumeIndex] = 0;
          }
          currentVolumeIndex = (currentVolumeIndex + 1) % averageAmount;

          if (currentVolumeIndex === 0) {
            const left = parseFloat((currentVolumeArrayLeft.reduce((a, b) => a + b) / averageAmount).toFixed(1));
            const right = parseFloat((currentVolumeArrayRight.reduce((a, b) => a + b) / averageAmount).toFixed(1));
            if(currentVolumeLeft.value !== left) {
              currentVolumeLeft.value = left;
            }

            if(currentVolumeRight.value !== right) {
              currentVolumeRight.value = right;
            }
          }
        }
      };

      audioSource.connect(node).connect(audioContext.destination);
    }
  }
});

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-8/12 h-full aspect-video mb-10 justify-center self-center bg-black">
      <video
          ref="videoEl"
          muted
          tabIndex={-1}
          disablepictureinpicture="true"
      />
    </div>
    <div class="">
      <AudioPreview :volume="currentVolumeLeft"/>
      <AudioPreview :volume="currentVolumeRight"/>
    </div>
  </div>
</template>

<style scoped>

</style>