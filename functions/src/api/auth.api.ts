import * as express from 'express'
import * as cors from 'cors'
import {handleLoginWithBody, handleLogout, currentUser, handleSignUp} from '../controllers/auth.handler'
export const service = express()

service.use(cors())

service.post('/signup', handleSignUp)
service.post('/login', handleLoginWithBody)
service.post('/logout', handleLogout)
service.get('/profile', currentUser)