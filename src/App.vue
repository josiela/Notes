<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import NoteForm from "./components/NoteForm.vue";
import {ref} from "vue";
import NoteCard from "./components/NoteCard.vue";
// Notiz-Logik kommt aus dem Composable statt aus der Komponente selbst
import {useNotes} from "./composables/useNotes.js";

// App.vue verwaltet die Liste nicht selbst, sondern nutzt nur die Funktionen aus useNotes
const { notes, addNote, deleteNote, filteredNotes: getFilteredNotes } = useNotes();

// Der Suchbegriff ist reiner UI-State der Suchleiste und bleibt deshalb in der Komponente
const searchTerm = ref<string>("");

// Gefilterte Ansicht aus useNotes; bekommt das ref übergeben und aktualisiert sich beim Tippen
const filteredNotes = getFilteredNotes(searchTerm);
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
