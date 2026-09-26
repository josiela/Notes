<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import NoteForm from "./components/NoteForm.vue";
import {computed, ref} from "vue";
import type {Note} from "./types/note.ts";
import NoteCard from "./components/NoteCard.vue";

const notes = ref<Note[]>([]);
const searchTerm = ref<string>("");

// Wird automatisch neu berechnet, sobald sich notes oder searchTerm ändern
const filteredNotes = computed<Note[]>(() => {
  const term = searchTerm.value.trim().toLowerCase();
  if (!term) return notes.value;

  return notes.value.filter(note =>
    note.title.toLowerCase().includes(term) ||
    note.content.toLowerCase().includes(term) ||
    note.tags.some(tag => tag.toLowerCase().includes(term))
  );
});

function addNote( note: Note ): void {
  notes.value.push(note);
}

function deleteNote( id: number ): void {
  notes.value = notes.value.filter(note => note.id !== id);
}
</script>

<template>
  <div class="mx-auto container py-20 px-6">
    <div class="flex justify-center pb-10 w-1/2">
      <SearchBar v-model="searchTerm" />
    </div>
    <NoteForm @add-note="addNote" />
    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="note in filteredNotes" :key="note.id">
        <NoteCard :note="note" @delete="deleteNote" />
      </div>
    </div>
    <p v-if="notes.length && !filteredNotes.length">
      Keine Notizen zu „{{ searchTerm }}“ gefunden.
    </p>
  </div>
</template>
