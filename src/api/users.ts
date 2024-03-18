import userHandlers from 'controllers/users.js'
import { Router } from 'express'

const router = Router()

router.get('/users', userHandlers.getMultipleUsers)

router.get('/users/:id', userHandlers.getSingleUser)

router.post('/users', userHandlers.postUsers)

router.put('/users/:id', userHandlers.putUsers)

router.delete('/users/:id', userHandlers.deleteSingleUser)

router.delete('/users', userHandlers.deleteMultipleUsers)

export default router
