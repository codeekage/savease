import * as cors from 'cors'
import * as express from 'express'
import { handleLoginWithQuery, handleLogout } from '../controllers/auth.handler'
import {
  handleAddUnit, handleUnitFetch, handleUnitFetchById
} from '../controllers/units.handler'
import { handleBatchRequest, handleBatchPins } from '../controllers/batch.handler';

export const service = express()
service.use(cors())

service.post('/login', handleLoginWithQuery)
service.post('/logout', handleLogout)
service.post('/add', handleAddUnit)
service.get('/fetch', handleUnitFetch)
service.get('/fetch/:id', handleUnitFetchById)
service.post('/batch', handleBatchRequest)
service.post('/batch/pins', handleBatchPins)
