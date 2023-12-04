import { createContext } from 'react'
import { Note } from '../model/note'

const NoteContext = createContext<{
  notes: Note[]
  setNotes: (notes: Note[]) => void
}>({
  notes: [],
  setNotes: () => {}
})

export default NoteContext
