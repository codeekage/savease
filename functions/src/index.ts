import * as functions from 'firebase-functions'
import {app} from './services/auth.service'

export const auth = functions.https.onRequest(app)
