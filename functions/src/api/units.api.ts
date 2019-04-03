import * as cors from 'cors'
import * as express from 'express'
import { handleLoginWithQuery, handleLogout } from '../controllers/auth.handler'
import {
  handleAddUnit, handleUnitFetch
} from '../controllers/units.handler'

export const service = express()
service.use(cors())

service.post('/login', handleLoginWithQuery)
service.post('/logout', handleLogout)
service.post('/add', handleAddUnit)
service.get('/fetch', handleUnitFetch)
