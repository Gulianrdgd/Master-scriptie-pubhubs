<script setup lang="ts">
import { PropType } from 'vue';
import { Options, useFormInputEvents, usedEvents } from '@/composables/useFormInputEvents';

const props = defineProps({
  options: {
    type: Array as PropType<Options>,
    required: true,
  },
  value: {
    type: String,
    default: '',
  },
  onSelect:{
    type: Function,
    default: () => {},
  }
});

const emit = defineEmits(usedEvents);
const { value: inputValue, setValue, setOptions, selectOption, changed } = useFormInputEvents(emit);

setValue(props.value);
setOptions(props.options);

function updateSelect(event: Event) {
  const target = event.target as HTMLSelectElement;
  selectOption(target);
  changed();
  props.onSelect(inputValue.value);
}
</script>

<template>
  <select
          @change="updateSelect($event); changed();"
          class="max-w-32 text-black bg-transparent rounded-2xl border-1 border-black focus:outline-0 focus:outline-offset-0 focus:ring-0 focus:ring-offset-0 focus:ring-offset-width-0 focus:shadow-0"
  >
    <option  v-for="option in options" :key="option.value" v-bind:value="option.value" :selected="option.value === inputValue">{{option.label}}</option>
  </select>
</template>

<style scoped>
  select {
    background-image: none;
  }
  select:focus {
    --tw-ring-offset-width: 0px;
  }
</style>
