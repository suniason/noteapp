import Head from 'next/head'
import React from 'react'
import * as NotesApi from './api/fetch'
import { useRouter } from 'next/router'

const Login: React.FC = () => {
  const router = useRouter()
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [errMessage, setErrMessage] = React.useState<boolean>(false)

  const loginClicked = () => {
    async function login() {
      try {
        if (!email && !password) {
          setErrMessage(true)
          setTimeout(() => setErrMessage(false), 3000)
        } else {
          const user = await NotesApi.loginUser({ email, password })
          console.log(user)
          if (user) {
            router.push('/dashboard')
          }
        }
      } catch (error) {
        console.log(error)
        alert(error)
      }
    }
    login()
  }

  return (
    <div>
      <Head>
        <title>Notes App | Login</title>
      </Head>
      <div className='flex w-full min-h-[80vh] justify-center items-center'>
        <div className='w-[35%] min-h-[50vh] bg-slate-950 flex justify-center items-center'>
          <div className='w-[80%]'>
            <div className='my-10 flex justify-center items-center font-bold text-4xl text-white'>
              LOGIN
            </div>
            <div>
              <div className='my-2 text-lg font-semibold text-white'>Email</div>
              <input
                className='w-[98%] rounded-lg py-[.3rem] px-[.4rem] bg-slate-400'
                type='text'
                onChange={e => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <div className='my-2 text-lg font-semibold text-white'>Password</div>
              <input
                className='w-[98%] rounded-lg py-[.3rem] px-[.4rem] bg-slate-400'
                type='password'
                onChange={e => setPassword(e.target.value)}
              ></input>
            </div>
            {errMessage ? (
              <div className='text-red-500 text-[.7rem] mt-3'>* Parameters missing</div>
            ) : null}
            <div className='flex justify-center items-center m-10'>
              <button
                className='bg-white px-7 py-1 font-semibold rounded-xl '
                onClick={loginClicked}
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
