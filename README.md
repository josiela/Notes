# Notes App

Notiz-App mit Vue 3, TypeScript, Vite und Tailwind CSS. Notizen können angelegt, durchsucht (Titel, Inhalt, Tags) und gelöscht werden und bleiben über `localStorage` nach einem Reload erhalten.

## 1. Setup

Voraussetzung: [Node.js](https://nodejs.org/)

```bash
git clone [repository-link]
```

### Mit yarn

```bash
yarn install
yarn dev
```

### Mit npm

```bash
npm install
npm run dev
```

Danach im Terminal auf den angezeigten lokalen Link klicken (standardmäßig `http://localhost:5173`).

## Projektstruktur

```
src/
├── App.vue                    # Wurzelkomponente, verbindet Komponenten mit useNotes
├── components/
│   ├── BaseCard.vue           # Generische Karte mit Slots (header + default)
│   ├── NoteCard.vue           # Zeigt eine Notiz, emittet "delete"
│   ├── NoteForm.vue           # Formular für neue Notizen, emittet "addNote"
│   └── SearchBar.vue          # Suchfeld, per v-model einbindbar
├── composables/
│   ├── useNotes.js            # Notiz-Logik: Liste, addNote, deleteNote, filteredNotes
│   └── useLocalStorage.js     # Laden/Speichern in localStorage
└── types/
    └── note.ts                # Note-Interface
```

## 2. Begründung der Struktur

Die Notiz-Logik liegt in `useNotes`, damit die Komponenten nur für die Darstellung und Benutzer:innen-Eingaben zuständig sind und die Liste nur an einer Stelle verändert wird. Das macht die Logik wiederverwendbar, verständlich und leichter testbar. `useLocalStorage` trennt zusätzlich das Speichern von der restlichen Logik. Alle `localStorage`-Zugriffe liegen in einer Datei, sodass sich der Speicherort später austauschen lässt, ohne `useNotes` oder die Komponenten anzufassen.

## 3. Reflexionsfragen

**Warum darf NoteCard die Notiz-Prop nicht selbst verändern, und wie lösen wir das stattdessen?**
Props fließen nur von oben nach unten und dürfen nur im Parent verändert werden. Würde das Kind die Daten der Elternkomponente direkt ändern, wäre nicht mehr nachvollziehbar, wer den State verändert. Außerdem überschreiben die Eltern-Props die Child-Änderungen beim nächsten Rendern. NoteCard emittet deshalb nur ein Event (`delete` mit der `id`), App.vue reagiert darauf und ruft `deleteNote()` aus `useNotes` auf. Dasselbe Muster nutzt NoteForm mit `addNote`.

**Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen – teilen sie sich die Notizen oder nicht?**
Nein, nicht reaktiv. `notes` wird innerhalb der Funktion `useNotes()` erzeugt, also bekommt jeder Aufruf seinen eigenen `ref`. Beide lesen beim Start denselben `localStorage`-Key und haben dadurch anfangs die gleichen Daten. Eine Änderung in der einen Instanz erscheint aber nicht sofort in der anderen, und die zuletzt speichernde Instanz überschreibt die andere. In meiner App ruft nur `App.vue` `useNotes()` auf, deshalb tritt das Problem hier nicht auf.

**Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?**
Das Interface legt fest, wie eine Notiz aussieht. TypeScript prüft das schon beim Entwickeln. Fehlt z. B. `tags` oder wird ein falscher Typ emittet, gibt es einen Fehler, bevor die App läuft. Außerdem dient es als Dokumentation und sammelt übersichtlich an einer Stelle, wie Objekte aussehen müssen.
