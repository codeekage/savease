import * as functions from 'firebase-functions'
import { service as auth_service} from './api/auth.api'
import { service as units_service } from './api/units.api'
import { service as batch_service } from './api/batch.api'
import { onCreate } from './triggers/auth.trigger'
import { onCreateBatch } from './triggers/wallet.trigger';



export const auth = functions.https.onRequest(auth_service)
export const units = functions.https.onRequest(units_service)
export const batch = functions.https.onRequest(batch_service)
export const onCreateUser = functions.auth.user().onCreate(onCreate)
export const onCreatePins = onCreateBatch