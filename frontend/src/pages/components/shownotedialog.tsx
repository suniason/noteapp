import React from 'react'
import { Note } from '../model/note'
import Image from 'next/image'
import ConfirmDelete from './deletenotedialog'
import UpdateNoteDialog from './updatenotedialog'

interface Props {
  stat: boolean
  note: Note
  clicked: (value: boolean) => void
}

const ShowNoteDialog: React.FC<Props> = ({ stat, note, clicked }: Props) => {
  const { _id: id, text, title } = note
  const [showDialog, setShowDialog] = React.useState<boolean>(stat)
  const [deleteClicked, setDeleteClicked] = React.useState<boolean>(false)
  const [updateClicked, setUpdateClicked] = React.useState<boolean>(false)

  const remove = (value: boolean) => {
    setDeleteClicked(value)
    clicked(false)
  }

  const update = (value: boolean) => {
    setUpdateClicked(value)
    clicked(false)
  }

  return (
    <div>
      {showDialog ? (
        <div>
          <div className='fixed flex justify-center items-center overflow-x-hidden overflow-y-auto w-full h-full inset-0 z-50'>
            <div className='bg-slate-700 rounded-xl w-[40%] h-[70vh] flex relative overflow-hidden'>
              <div className='w-full mx-16 text-white'>
                <div className='mt-8 flex justify-center items-center font-semibold text-2xl'>
                  {title}
                </div>
                <div className='mt-10 h-[35vh] overflow-y-auto'>
                  <div className=' text-lg whitespace-pre-line'>{text}</div>
                </div>
              </div>
              <div className='absolute bottom-0 h-[12vh] p-2 flex justify-center items-center w-full bg-slate-800'>
                <button
                  className='bg-red-500 px-7 py-2 m-3 font-semibold rounded-xl'
                  onClick={() => {
                    setShowDialog(false)
                    clicked(false)
                  }}
                >
                  Close
                </button>
                <button
                  className='bg-blue-500 px-7 py-2 m-3 font-semibold rounded-xl'
                  onClick={() => setUpdateClicked(true)}
                >
                  <Image src={'/update.svg'} width={30} height={20} alt=''></Image>
                </button>
                <button
                  className='bg-black px-7 py-2 m-3 font-semibold rounded-xl'
                  onClick={() => {
                    setDeleteClicked(true)
                  }}
                >
                  <Image src={'/delete.svg'} width={30} height={30} alt=''></Image>
                </button>
              </div>
            </div>
            <div>
              {deleteClicked ? (
                <ConfirmDelete showdelete={deleteClicked} note={note} clicked={remove} />
              ) : null}
            </div>
            <div>
              {updateClicked ? (
                <UpdateNoteDialog showupdate={updateClicked} note={note} clicked={update} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ShowNoteDialog
