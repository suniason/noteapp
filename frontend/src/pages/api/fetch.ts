import { Note } from '../model/note'
import { User } from '../model/user'

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init)
  if (response.ok) {
    return response
  } else {
    const errorBody = await response.json()
    const errorMessage = errorBody.error
    throw Error(errorMessage)
  }
}

export async function getLoginUser(): Promise<User> {
  const response = await fetch(`http://localhost:5000/api/users/,`, { method: 'GET' })
  return response.json()
}

interface RegisterCredentials {
  username: string
  email: string
  password: string
}

export async function registerUser(user: RegisterCredentials): Promise<User> {
  const response = await fetch(`http://localhost:5000/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  return await response.json()
}

interface LoginCredentials {
  email: string
  password: string
}

export async function loginUser(user: LoginCredentials): Promise<User> {
  const response = await fetch(`http://localhost:5000/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  return await response.json()
}

export async function logout() {
  await fetch(`http://localhost:5000/api/users/logout`, { method: 'POST' })
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetch(`http://localhost:5000/api/notes`, { method: 'GET' })
  return await response.json()
}

export interface NoteInput {
  title: string
  text?: string
}

export async function createNotes(note: NoteInput) {
  const response = await fetch(`http://localhost:5000/api/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  return await response.json()
}

export async function updateNotes(id: string, note: NoteInput) {
  const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  return await response.json()
}

export async function deleteNotes(id: string) {
  const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response)
}
