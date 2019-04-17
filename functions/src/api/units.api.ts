import * as cors from 'cors'
import * as express from 'express'
import { handleLogout, handleLogin } from '../controllers/auth.handler'
import {
  handleAddUnit, handleUnitFetch, handleUnitFetchById
} from '../controllers/units.handler'

export const service = express()
service.use(cors())

service.post('/login', handleLogin)
service.get('/logout', handleLogout)
service.post('/add', handleAddUnit)
service.get('/fetch', handleUnitFetch)
service.get('/fetch/:id', handleUnitFetchById)

