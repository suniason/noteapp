import React from 'react'
import { Note as NoteModel } from '../model/note'
import { formatDate } from '../util/dateformat'
import ShowNoteDialog from './shownotedialog'

interface NoteCardProps {
  note: NoteModel
  color: string
}

const NoteCard: React.FC<NoteCardProps> = ({ note, color }: NoteCardProps) => {
  const { text, title, createdAt, updatedAt } = note
  let createdUpdated: string
  const [clicked, setClicked] = React.useState<boolean>(false)

  const checkClick = (value: boolean) => {
    setClicked(value)
  }

  const colorVariants = {
    blue: 'bg-blue-300',
    red: 'bg-red-300',
    yellow: 'bg-yellow-300',
    green: 'bg-green-300',
    orange: 'bg-orange-300',
    indigo: 'bg-indigo-300'
  }
  if (updatedAt > createdAt) {
    createdUpdated = `Updated: ${formatDate(updatedAt)}`
  } else {
    createdUpdated = `Created: ${formatDate(updatedAt)}`
  }

  return (
    <>
      <div className='box-border hover:opacity-80 cursor-pointer ' onClick={() => setClicked(true)}>
        <div
          className={` relative w-[18rem] p-3    
	  ${colorVariants[color as keyof typeof colorVariants]}`}
        >
          <div className='font-extrabold text-center text-[1.2rem]'>{title}</div>
          <div className='m-3 whitespace-pre-line'>{text}</div>
        </div>
        <div>
          <div
            className={`flex items-center text-[0.7rem] ps-5 relative w-[18rem] h-[2rem] overflow-hidden opacity-90
		  ${colorVariants[color as keyof typeof colorVariants]}`}
          >
            {createdUpdated}
          </div>
        </div>
      </div>
      <div>
        {clicked ? <ShowNoteDialog stat={clicked} note={note} clicked={checkClick} /> : null}
      </div>
      </>
  )
}

export default NoteCard
