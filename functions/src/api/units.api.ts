import * as cors from 'cors'
import * as express from 'express'
import { handleLoginWithQuery,  handleAsyncLogout } from '../controllers/auth.handler'
import {
  handleAddUnit, handleUnitFetch, handleUnitFetchById
} from '../controllers/units.handler'
import { handleBatchRequest } from '../controllers/batch.handler';
import { handleAddFund, handleGetFund } from '../controllers/wallet.handler';

export const service = express()
service.use(cors())

service.post('/login', handleLoginWithQuery)
service.get('/logout', handleAsyncLogout)
service.post('/add', handleAddUnit)
service.get('/fetch', handleUnitFetch)
service.get('/fetch/:id', handleUnitFetchById)
service.post('/batch', handleBatchRequest)
service.post('/wallet', handleAddFund)
service.get('/wallet', handleGetFund)
