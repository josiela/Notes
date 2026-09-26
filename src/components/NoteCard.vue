<script setup lang="ts">
import BaseCard from "./BaseCard.vue";
import type { Note } from "../types/note"

defineProps<{ note: Note }>()
defineEmits<{ delete: [id: number] }>();
</script>

<template>
  <BaseCard>
    <!-- Inhalt für Header in BaseCard-->
    <template #header>
      <h3>{{ note.title }}</h3>
    </template>
    <p>{{ note.content }}</p>
    <div class="flex items-center justify-between text-gray-800">
      <p v-for="tag in note.tags" :key="tag">
        {{ tag }}
      </p>
      <button @click="$emit('delete', note.id)" class="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">X</button>
    </div>
  </BaseCard>
</template>

<style scoped>

</style>