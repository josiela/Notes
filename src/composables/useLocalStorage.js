import { ref, watch } from 'vue'

// Liest einen Wert beim Start aus localStorage und schreibt ihn bei jeder Änderung zurück.
export function useLocalStorage(key, initialValue) {
    // Beim Start gespeicherten Wert laden; bei kaputtem JSON auf den Startwert zurückfallen,
    // damit die App nicht abstürzt
    let startValue = initialValue
    try {
        const stored = localStorage.getItem(key)
        if (stored) startValue = JSON.parse(stored)
    } catch {
        startValue = initialValue
    }
    const value = ref(startValue)

    // deep: true, damit auch push() in ein Array (nicht nur eine neue Zuweisung) gespeichert wird
    watch(value, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    }, { deep: true })

    return value
}
