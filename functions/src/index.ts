import * as functions from 'firebase-functions'
import { service as auth_service} from './api/auth.api'
import { service as units_service } from './api/units.api'
import { onCreate } from './triggers/auth.trigger'



export const auth = functions.https.onRequest(auth_service)
export const units = functions.https.onRequest(units_service)
export const onCreateUser = functions.auth.user().onCreate(onCreate)
