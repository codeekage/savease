import * as cors from 'cors'
import * as express from 'express'
import { handleLogout, handleLogin } from '../controllers/auth.handler'
import { handleBatchRequest, handleBatchHistory, forecHandleBatchHistory } from '../controllers/batch.handler';

export const service = express()
service.use(cors())


service.post('/login', handleLogin)
service.get('/logout', handleLogout)
service.post('/add', handleBatchRequest)
service.get('/history', handleBatchHistory)
service.get('/history/:id', forecHandleBatchHistory)

