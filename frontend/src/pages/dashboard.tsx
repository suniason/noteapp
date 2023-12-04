import Head from 'next/head'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import { Note } from './model/note'
import NoteCard from './components/note'
import * as NotesApi from './api/fetch'
import AddNoteDialog from './components/addnotedialog'
import NoteContext from './context/noteContext'
import Loading from './components/loading'

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes()
        setNotes(notes)
      } catch (error) {
        console.error(error)
        alert(error)
      }
    }
    loadNotes()
  }, [])

  const colorPicker = () => {
    const colorArr = ['blue', 'red', 'yellow', 'green', 'orange', 'indigo']
    return colorArr[Math.floor(Math.random() * colorArr.length)]
  }

  const deleteNote = (note: Note) => {
    setNotes(notes.filter(val => val._id !== note._id))
  }

  const updateNote = (note: Note) => {
    setNotes(notes)
  }

  return (
    <div>
      <NoteContext.Provider value={{ notes, setNotes }}>
        <Head>
          <title>Notes App | Dashboard</title>
        </Head>
        <div className='flex w-full min-h-[100dvh] justify-center'>
          <div className='m-10 bg-slate-950 min-h-full p-10 w-[80%] flex justify-center'>
            <div className='w-full min-h-fit'>
              <div className='text-white flex justify-start mb-5 text-[2.5rem] font-bold w-full'>
                Notes
              </div>
              <div className='grid grid-cols-3 gap-3'>
                  {notes?.map((note, key) => (
                    <div key={key}>
                      <NoteCard key={key} note={note} color={colorPicker()} />
                    </div>
                    ))}
              </div>
            </div>
          </div>
          <Link href='/'>
            <div></div>
          </Link>
        </div>
        <div>
          <AddNoteDialog
            onSave={newNote => {
              setNotes([...notes, newNote])
            }}
          />
        </div>
      </NoteContext.Provider>
    </div>
  )
}

export default Dashboard
