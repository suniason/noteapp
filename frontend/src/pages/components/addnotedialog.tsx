import React, { useRef } from 'react'
import Image from 'next/image'
import * as NotesApi from '../api/fetch'
import { Note } from '../model/note'

interface Props {
  onSave: (note: Note) => void
}

const AddNoteDialog: React.FC<Props> = ({ onSave }: Props) => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string>('')
  const [text, setText] = React.useState<string>('')
  const [isblank, setIsblank] = React.useState<boolean>(false)
  const titleRef = useRef<HTMLInputElement>(null)

  const onAdd = () => {
    async function addNote() {
      try {
        if (title) {
          const notes = await NotesApi.createNotes({ title, text })
          onSave(notes)
          setShowDialog(false)
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
    addNote()
  }

  return (
    <div>
      <button
        className='flex justify-center items-center fixed cursor-pointer bottom-10 right-10 bg-white w-[3rem] h-[3rem] hover:bg-slate-300'
        onClick={() => setShowDialog(true)}
      >
        <Image src={'/plus.svg'} width={20} height={20} alt={''}></Image>
      </button>
      {showDialog ? (
        <div>
          <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto w-full h-full inset-0'>
            <div className='bg-slate-700  w-[40%] h-[80vh] flex relative overflow-hidden'>
              <div className='w-full mx-16 text-white'>
                <div className='mt-8 flex justify-center items-center font-bold text-3xl'>
                  New Note
                </div>
                <div className='mt-5'>
                  <div className='my-2 text-lg font-semibold'>Title:</div>
                  <input
                    ref={titleRef}
                    className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-500'
                    placeholder='Write your title here...'
                    type='text'
                    onChange={e => setTitle(e.target.value)}
                  ></input>
                  {isblank ? (
                    <div className='text-red-500 text-[.8rem]'>This field is required</div>
                  ) : null}
                </div>
                <div className='mt-5'>
                  <div className='my-2 text-lg font-semibold'>Text:</div>
                  <textarea
                    className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-500 h-[30vh]'
                    placeholder='Write your text here...'
                    onChange={e => setText(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className='absolute bottom-0 h-15 p-[.1rem] flex justify-center w-full bg-slate-800'>
                <button
                  className='bg-red-500 px-7 py-1 m-3 font-semibold '
                  onClick={() => setShowDialog(false)}
                >
                  Close
                </button>
                <button
                  className='bg-green-500 px-7 py-1 m-3 font-semibold'
                  onClick={() => onAdd()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AddNoteDialog
