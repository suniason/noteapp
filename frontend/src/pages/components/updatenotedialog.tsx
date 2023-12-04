import React, { useContext, useRef } from 'react'
import * as NotesApi from '../api/fetch'
import { Note } from '../model/note'
import NoteContext from '../context/noteContext'

interface Props {
  showupdate: boolean
  note: Note
  clicked: (value: boolean) => void
}

const UpdateNoteDialog: React.FC<Props> = ({ showupdate, note, clicked }: Props) => {
  const { _id: id, text, title } = note
  const [updateDialog, setUpdateDialog] = React.useState<boolean>(showupdate)
  const [newTitle, setNewTitle] = React.useState<string>(title)
  const [newText, setNewText] = React.useState<string>(text)
  const [isblank, setIsblank] = React.useState<boolean>(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const context = useContext(NoteContext)

  const updateClicked = () => {
    async function updateNote() {
      try {
        if (newTitle) {
          const newNote = await NotesApi.updateNotes(id, { title: newTitle, text: newText })
          context.setNotes(context.notes.map(prev => (prev._id === id ? newNote : prev)))
          console.log(newNote)
          clicked(false)
        } else {
          if (titleRef.current) {
            titleRef.current.style.outline = '1px solid red'
            setIsblank(true)
            setTimeout(() => {
              if (titleRef.current) {
                titleRef.current.style.outline = 'none'
                setIsblank(false)
              }
            }, 5000)
          }
        }
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
    updateNote()
  }
  return (
    <div>
      {updateDialog ? (
        <div>
          <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto w-full h-full inset-0 z-100'>
            <div className='bg-slate-700  w-[40%] h-[80vh] flex relative overflow-hidden'>
              <div className='w-full mx-16 text-white'>
                <div className='mt-8 flex justify-center items-center font-bold text-3xl'>
                  Update Note
                </div>
                <div className='mt-5'>
                  <div className='my-2 text-lg font-semibold'>Title:</div>
                  <input
                    ref={titleRef}
                    className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-500'
                    type='text'
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                  ></input>
                  {isblank ? (
                    <div className='text-red-500 text-[.8rem]'>This field is required</div>
                  ) : null}
                </div>
                <div className='mt-5'>
                  <div className='my-2 text-lg font-semibold'>Text:</div>
                  <textarea
                    className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-500 h-[30vh]'
                    value={newText}
                    placeholder='Write your text here...'
                    onChange={e => setNewText(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className='absolute bottom-0 h-15 p-[.1rem] flex justify-center w-full bg-slate-800'>
                <button
                  className='bg-red-500 px-7 py-1 m-3 font-semibold '
                  onClick={() => {
                    setUpdateDialog(false)
                    clicked(false)
                  }}
                >
                  Close
                </button>
                <button
                  className='bg-blue-500 px-7 py-1 m-3 font-semibold '
                  onClick={() => {
                    updateClicked()
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UpdateNoteDialog
