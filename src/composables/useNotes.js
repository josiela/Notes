import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

export function useNotes() {
    const notes = useLocalStorage('quicknotes', [])

    function addNote(note) {
        // TODO: neue Notiz mit eigener id an die Liste hängen
    }

    function deleteNote(id) {
        // TODO: Notiz mit dieser id entfernen
    }

    function filteredNotes(term) {
        // TODO: nach Titel, Text oder Tag filtern
        return computed(() => notes.value)
    }

    return { notes, addNote, deleteNote, filteredNotes }
}
