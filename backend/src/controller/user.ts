import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import UserModel from '../models/user'
import bcrypt from 'bcrypt'

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, 'User Not Authenticated')
    }

    const user = await UserModel.findById(authenticatedUserId).select('+username')
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

interface SignupBody {
  username?: string
  email?: string
  password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignupBody, unknown> = async (
  req,
  res,
  next
) => {
  const username = req.body.username
  const email = req.body.email
  const rawPassword = req.body.password

  try {
    if (!username || !email || !rawPassword) {
      throw createHttpError(400, 'Missing Parameters')
    }
    const checkUsername = await UserModel.findOne({ username: username }).exec()
    if (checkUsername) {
      throw createHttpError(409, 'Username already exists.')
    }
    const checkEmail = await UserModel.findOne({ email: email }).exec()
    if (checkEmail) {
      throw createHttpError(409, 'User with email already exists.')
    }

    const hashPassword = await bcrypt.hash(rawPassword, 10)
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashPassword
    })

    req.session.userId = newUser._id

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

interface LoginBody {
  email?: string
  password?: string
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (
  req,
  res,
  next
) => {
  const email = req.body.email
  const rawPassword = req.body.password
  try {
    if (!email || !rawPassword) {
      throw createHttpError(404, 'Parameters Missing')
    }
    const user = await UserModel.findOne({ email: email }).select('+password + username').exec()

    if (!user) {
      throw createHttpError(401, 'Invalid Credentials')
    }

    const passwordCheck = await bcrypt.compare(rawPassword, user.password)

    if (!passwordCheck) {
      throw createHttpError(401, 'Invalid Credentials')
    }

    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error)
    } else res.sendStatus(200)
  })
}
