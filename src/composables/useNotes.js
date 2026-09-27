import { computed, toValue } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

// Typ aus note.ts per JSDoc, damit TypeScript in App.vue weiß, was in der Liste steckt
/** @typedef {import('../types/note').Note} Note */

// Zentrale Notiz-Logik: Komponenten rufen nur diese Funktionen auf,
// die Liste selbst wird ausschließlich hier verändert.
export function useNotes() {
    // Die Liste kommt aus useLocalStorage und wird dadurch automatisch gespeichert/geladen
    /** @type {import('vue').Ref<Note[]>} */
    const notes = useLocalStorage('quicknotes', [])

    /** @param {Note} note */
    function addNote(note) {
        // Die id vergibt der Composable selbst, damit sie immer eindeutig ist –
        // egal, was die aufrufende Komponente mitschickt.
        // Date.now() allein reicht nicht: zwei Notizen in derselben Millisekunde bekämen
        // dieselbe id. Deshalb mindestens (größte vorhandene id + 1).
        const maxId = Math.max(0, ...notes.value.map(n => n.id))
        notes.value.push({ ...note, id: Math.max(Date.now(), maxId + 1) })
    }

    /** @param {number} id */
    function deleteNote(id) {
        // Neue Liste ohne die Notiz mit dieser id – die Zuweisung löst den watch in useLocalStorage aus
        notes.value = notes.value.filter(note => note.id !== id)
    }

    /**
     * Gibt eine gefilterte, reaktive Ansicht auf die Notizen zurück.
     * @param {import('vue').MaybeRefOrGetter<string>} term Suchbegriff (z. B. ein ref aus der SearchBar)
     * @returns {import('vue').ComputedRef<Note[]>}
     */
    function filteredNotes(term) {
        return computed(() => {
            // toValue liest sowohl refs als auch normale Strings aus – so bleibt das computed
            // reaktiv, wenn ein ref übergeben wird
            const search = toValue(term).trim().toLowerCase()

            // Leere Suche: alle Notizen anzeigen
            if (!search) return notes.value

            // Treffer in Titel, Inhalt oder einem der Tags (Groß-/Kleinschreibung egal)
            return notes.value.filter(note =>
                note.title.toLowerCase().includes(search) ||
                note.content.toLowerCase().includes(search) ||
                note.tags.some(tag => tag.toLowerCase().includes(search))
            )
        })
    }

    return { notes, addNote, deleteNote, filteredNotes }
}
