import express from 'express'
import * as UserController from '../controller/user'

const router = express.Router()

router.post('/register', UserController.signUp)
router.post('/login', UserController.login)
router.get('/', UserController.getAuthenticatedUser)
router.post('/logout', UserController.logout)

export default router
