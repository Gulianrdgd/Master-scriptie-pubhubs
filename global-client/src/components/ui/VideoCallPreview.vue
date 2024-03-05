<script setup lang="ts">
import {computed, ref, watch} from "vue";
import useVideoCall from "@/store/videoCall";
import AudioPreview from "@/components/ui/AudioPreview.vue";

const videoEl = ref<HTMLVideoElement | null>(null);

const videoCall = useVideoCall();
const videoSource = computed(() => videoCall.video_track);
const audioSource = computed(() => videoCall.audio_track);

// const averageAmount = 10;

const currentVolumeLeft = ref(0);
const currentVolumeRight = ref(0);

// const currentVolumeArray = ref([] as number[]);
// const currentVolumeIndex = ref(0);
// const currentVolume = computed(() => {
//   if (currentVolumeArray.value.length === 0) {
//     return 0;
//   }
//   return currentVolumeArray.value.reduce((a, b) => a + b) / currentVolumeArray.value.length;
// });

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();

// function appendToVolumeArray(volume: number) {
//   if (currentVolumeArray.value.length < averageAmount) {
//     currentVolumeArray.value.push(volume);
//   } else {
//     currentVolumeArray.value[currentVolumeIndex.value] = volume;
//     currentVolumeIndex.value = (currentVolumeIndex.value + 1) % averageAmount;
//   }
// }

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

      const node = new AudioWorkletNode(audioContext, 'audiolevel');

      node.port.onmessage = (event) => {
        if (event.data.volume as number[]) {
          if(event.data.volume.length > 0){
            currentVolumeLeft.value = event.data.volume[0].value * 5;
          }else{
            currentVolumeLeft.value = 0;
          }
          if(event.data.volume.length > 1){
            currentVolumeRight.value = event.data.volume[1].value * 5;
          }else{
            currentVolumeRight.value = 0;
          }
        }
      };

      audioSource.connect(node).connect(audioContext.destination);
    }
  }
});

</script>

<template>
  <video
      ref="videoEl"
      muted
      tabIndex={-1}
      disablepictureinpicture="true"
  />
  <div>
    <AudioPreview :volume="currentVolumeLeft"/>
    <AudioPreview :volume="currentVolumeRight"/>
  </div>
</template>

<style scoped>

</style>