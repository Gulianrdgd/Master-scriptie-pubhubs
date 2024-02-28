<script setup lang="ts">

import Dropdown from "@/components/forms/Dropdown.vue";
import {Options} from '@/composables/useFormInputEvents';
import {onMounted, ref} from "vue";
// devices.map((device) => {
//   return { label: device.label, value: device.deviceId };
// });
// const devices = await LivekitRoom.getLocalDevices('audioinput');

let options = ref<Options>([]);


onMounted(async () => {

  //
  // options.value = devices.map((device) => {
  //   return { label: device.label, value: device.deviceId };
  // });
});

</script>

<template>
  <div class="w-full h-full bg-avatar-orange">
    <div class="flex justify-center items-center h-screen dark:text-white p-10">
      <div class="text-center">
        <h1 class="text-6xl font-bold mb-8">Starting video call</h1>

        <div class="flex justify-center items-center">
          <div>
            <h2>Microphones</h2>
            <Dropdown value="" :options="options" />
          </div>
        </div>
        <router-link :to="{ name: 'home' }"><Button>Go back</Button></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>