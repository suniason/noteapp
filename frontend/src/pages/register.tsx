import Head from 'next/head'
import React from 'react'
import * as NotesApi from './api/fetch'
import { useRouter } from 'next/router'

const SignUp: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [checkPassword, setCheckPassword] = React.useState<string>('')
  const [checkErr, setCheckErr] = React.useState<boolean>(false)
  const [errMessage, setErrMessage] = React.useState<string>('')

  const registerClicked = () => {
    async function register() {
      if (!username || !password || !email) {
        setErrMessage(`* All field are required`)
        setCheckErr(true)
        setTimeout(() => {
          setCheckErr(false)
          setErrMessage('')
        }, 3000)
      } else if (password !== checkPassword) {
        setErrMessage(`* password do not match`)
        setCheckErr(true)
        setTimeout(() => {
          setCheckErr(false)
          setErrMessage('')
        }, 3000)
      } else {
        const registerData = await NotesApi.registerUser({ username, email, password })
        alert(registerData)
        if (registerData) {
          router.push('/login')
        }
      }
    }
    register()
  }

  return (
    <div>
      <Head>
        <title>Notes App | Register</title>
      </Head>
      <div className='flex w-full min-h-[100vh] justify-center items-center'>
        <div className='w-[35%] min-h-[50vh] bg-slate-950 flex justify-center items-center'>
          <div className='w-[80%]'>
            <div className='my-10 flex justify-center items-center font-bold text-4xl text-white'>
              REGISTER
            </div>
            <div>
              <div>
                <div className='my-2 text-lg font-semibold text-white'>Username</div>
                <input
                  className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-400'
                  type='text'
                  onChange={e => setUsername(e.target.value)}
                ></input>
              </div>
              <div className='my-2 text-lg font-semibold text-white'>Email</div>
              <input
                className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-400'
                type='email'
                onChange={e => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <div className='my-2 text-lg font-semibold text-white'>Password</div>
              <input
                className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-400'
                type='password'
                onChange={e => setPassword(e.target.value)}
              ></input>
            </div>

            <div>
              <div className='my-2 text-lg font-semibold text-white'>Confirm Password</div>
              <input
                className='w-[98%]  py-[.3rem] px-[.4rem] bg-slate-400'
                type='password'
                onChange={e => setCheckPassword(e.target.value)}
              ></input>
            </div>
            {checkErr ? <div className='text-red-500 text-[.7rem] mt-5'>{errMessage}</div> : null}
            <div className='flex justify-center items-center m-10'>
              <button
                className='bg-white px-7 py-1 font-semibold  '
                onClick={registerClicked}
              >
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
