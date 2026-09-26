<script setup lang="ts">
import { type Note } from "../types/note.ts"
import { ref } from "vue";

const emit = defineEmits<{ addNote: [note: Note] }>();

// Reaktive Formularfelder, per v-model an die Inputs gebunden
const title = ref<string>("")
const content = ref<string>("")
const tags = ref<string>("")

function submitNote(): void {
  // Leere Notizen nicht absenden
  if (!title.value.trim() || !content.value.trim()) return;

  const note: Note = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    tags: tags.value
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0),
  };

  emit("addNote", note);

  // Formular zurücksetzen
  title.value = "";
  content.value = "";
  tags.value = "";
}
</script>

<template>
  <div class="w-1/2 h-auto flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
    <form @submit.prevent="submitNote()" class="flex flex-col content-between">
      <input v-model="title" placeholder="Titel" required class="mb-4 rounded-lg border border-gray-400 w-full px-3 py-2"/>
      <textarea v-model="content" placeholder="Deine Notiz" required class="mb-4 rounded-lg border border-gray-400 w-full px-3 py-2" />
      <input v-model="tags" placeholder="Tags (mit Komma trennen)" class="mb-4 rounded-lg border border-gray-400 w-full px-3 py-2" />
      <button type="submit" class="w-50 h-8 mb-4 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">Notiz hinzufügen</button>
    </form>
  </div>
</template>

<style scoped>

</style>
