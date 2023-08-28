import React, { useContext } from 'react'
import * as NotesApi from '../api/fetch'
import { Note } from '../model/note'
import NoteContext from '../context/noteContext'

interface Props {
  showdelete: boolean
  note: Note
  clicked: (value: boolean) => void
}

const ConfirmDelete: React.FC<Props> = ({ showdelete, note, clicked }: Props) => {
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(showdelete)
  const context = useContext(NoteContext)

  function confirmClicked() {
    async function deleteNote() {
      try {
        await NotesApi.deleteNotes(note._id)
        context.setNotes(context.notes.filter(val => val._id !== note._id))
        clicked(false)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
    deleteNote()
  }

  return (
    <div>
      {deleteDialog ? (
        <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto w-full h-full inset-0 z-100'>
          <div className='bg-slate-800 rounded-xl w-[30%] h-[25vh] flex justify-center relative overflow-hidden'>
            <div className='text-white font-semibold flex items-center h-[15vh]'>
              Are you sure you want to delete note?
            </div>
            <div className='absolute bottom-0 h-[12vh] p-2 flex justify-center items-center w-full bg-slate-800'>
              <button
                className='bg-red-500 px-7 py-2 m-3 font-semibold rounded-xl'
                onClick={() => {
                  setDeleteDialog(false)
                  clicked(false)
                }}
              >
                Close
              </button>
              <button
                className='bg-black text-white px-7 py-2 m-3 font-semibold rounded-xl'
                onClick={() => confirmClicked()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ConfirmDelete
