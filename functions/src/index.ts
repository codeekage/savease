import * as functions from 'firebase-functions'
import { service } from './services/auth.service'
import { onCreate } from './triggers/auth.trigger'

export const auth = functions.https.onRequest(service)
export const onCreateUser = functions.auth.user().onCreate(onCreate)
