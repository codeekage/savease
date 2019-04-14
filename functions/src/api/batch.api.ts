import * as cors from 'cors'
import * as express from 'express'
import { handleLoginWithQuery, handleLoginWithBody, handleAsyncLogout } from '../controllers/auth.handler'
import { handleBatchRequest } from '../controllers/batch.handler';
import { handleAddFund, handleGetFund } from '../controllers/wallet.handler';

export const service = express()
service.use(cors())

service.post('/login', handleLoginWithQuery)
service.post('/login', handleLoginWithBody)
service.get('/logout', handleAsyncLogout)
service.post('/batch', handleBatchRequest)
service.post('/wallet', handleAddFund)
service.get('/wallet', handleGetFund)
