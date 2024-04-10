<template>
  <div v-if="isOnGoing" class="flex flex-col">
    <div class="flex flex-row items-center mb-2 space-x-2" >
      <Icon type="callrequest" size="sm" class="text-green"></Icon>
      <h1>Video call invite</h1>
    </div>
    <div class="flex items-center justify-left space-x-2">
      <div>
        <button class="bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click="joinCall">Join</button>
      </div>
      <div>
        <button class="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Ignore</button>
      </div>
    </div>
  </div>
  <div v-else>
  <div class="flex space-x-2 items-center">
    <Icon type="callend" size="sm" class="text-red"></Icon>
    <h1>Video call ended</h1>
  </div>
    <p v-if="props.call.time">Duration: {{elepased_time}} minutes</p>
  </div>
</template>

<script setup lang="ts">

import {M_VideoMessageEventContent} from "@/types/events";
import {useRooms} from "@/store/rooms";
import Icon from "@/components/elements/Icon.vue";
import {computed} from "vue";

const props = defineProps<{ room_id: string, call: M_VideoMessageEventContent }>();

const isOnGoing = !props.call["m.terminated"] && !props.call.hide;

const elepased_time = computed(() => {
  if(props.call.time) {
    return Math.round((props.call.time / 1000 ) / 60);
  }

  return 0;
});
function joinCall() {
  console.log("Joining call widget");
  const rooms = useRooms();

  const currentRoom = rooms.rooms[props.room_id];
  currentRoom.setUpAndJoinMatrixVideoCall();
}
</script>
