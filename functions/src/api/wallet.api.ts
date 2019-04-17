import * as express from 'express'
import * as cors from 'cors'
import { handleLogin, handleLogout } from '../controllers/auth.handler';
import { handleAddFund, handleGetFund } from '../controllers/wallet.handler';

export const service = express()

service.use(cors())

service.post('/login', handleLogin)
service.get('/logout', handleLogout)
service.post('/add', handleAddFund)
service.get('/fetch', handleGetFund)
