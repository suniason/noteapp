import Link from 'next/link'
import React from 'react'
import { User } from '../model/user'
import * as NotesApi from '../api/fetch'

interface Props {
  loggedInUser: User | null
  onLogout: () => void
}

const Navbar: React.FC<Props> = ({ loggedInUser, onLogout }: Props) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false)

  async function logout() {
    try {
      const user = await NotesApi.logout()
      onLogout()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='bg-gray-950 flex w-full min-h-[8vh] max-h-[8vh] justify-center items-center z-[999]'>
        <div className='flex w-[60%] justify-center text-white items-center'>
          <div className='flex justify-start w-1/2 text-lg font-bold'>
            <Link href='/'>Notes App </Link>
          </div>
          {loggedInUser ? (
            <div className='flex justify-end w-1/2 text-black font-semibold'>
              <div
                className='relative'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button className=' bg-white py-1 px-8 mx-2'>
                  {loggedInUser?.username}
                </button>
                {isHovered ? (
                  <ul className='absolute left-0 top-[100%] text-white z-50'>
                    <Link href={'/dashboard'}>
                      <li className='cursor-pointer px-10 py-2 bg-slate-900 hover:bg-slate-800'>
                        Dashboard
                      </li>
                    </Link>
                    <li
                      className='cursor-pointer px-10 py-2 bg-slate-900 hover:bg-slate-800'
                      onClick={() => {
                        logout()
                      }}
                    >
                      Log Out
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          ) : (
            <div className='flex justify-end w-1/2 text-black font-semibold'>
              <Link href='/login'>
                <button className=' bg-white py-1 px-3 mx-2'>Log In</button>
              </Link>
              <Link href='/register'>
                <button className=' bg-slate-700 py-1 px-3 mx-2 text-white'>
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
