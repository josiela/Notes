<script setup lang="ts">
import {useSlots} from "vue";

//Helper function provided by Vue's Composition API that gives you
// access to the slots passed into a component.
const slots = useSlots();
</script>

<template>
  <div class="w-full h-64 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
    <div v-if="slots.header" class="text-gray-800 font-bold mb-3">
      <slot name="header" />
    </div>
    <div class="w-full h-64 flex flex-col justify-between py-5">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>