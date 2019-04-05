import * as cors from 'cors'
import * as express from 'express'
import { handleLoginWithQuery, handleLogout, handleLoginWithBody } from '../controllers/auth.handler'
import { handleBatchRequest } from '../controllers/batch.handler';
import { handleAddFund, handleGetFund } from '../controllers/wallet.handler';

export const service = express()
service.use(cors())

service.post('/login', handleLoginWithQuery)
service.post('/login', handleLoginWithBody)
service.post('/logout', handleLogout)
service.post('/batch', handleBatchRequest)
service.post('/wallet', handleAddFund)
service.get('/wallet', handleGetFund)
