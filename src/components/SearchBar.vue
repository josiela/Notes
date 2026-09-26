<script setup lang="ts">
// v-model auf einer Komponente = Prop "modelValue" + Event "update:modelValue"
defineProps<{ modelValue: string }>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

function onInput(event: Event): void {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    type="search"
    :value="modelValue"
    @input="onInput"
    placeholder="Notizen durchsuchen..."
    class="rounded-lg border border-gray-400 w-full px-3 py-2"
  />
</template>

<style scoped>

</style>
