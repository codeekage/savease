import * as express from 'express'
import * as cors from 'cors'
import { handleLogin, handleLogout } from '../controllers/auth.handler';
import { handleWalletBalance, handleWalletHistory } from '../controllers/wallet.handler';

export const service = express()

service.use(cors())

service.post('/login', handleLogin)
service.get('/logout', handleLogout)
service.get('/balance', handleWalletBalance)
service.get('/history',  handleWalletHistory)
