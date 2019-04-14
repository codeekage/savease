import * as cors from 'cors'
import * as express from 'express'
import { handleLogout, handleLogin } from '../controllers/auth.handler'
import { handleBatchRequest } from '../controllers/batch.handler';
import { handleAddFund, handleGetFund } from '../controllers/wallet.handler';

export const service = express()
service.use(cors())


service.post('/login', handleLogin)
service.get('/logout', handleLogout)
service.post('/batch', handleBatchRequest)
service.post('/wallet', handleAddFund)
service.get('/wallet', handleGetFund)
