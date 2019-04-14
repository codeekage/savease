import * as functions from 'firebase-functions'
import { sendEmail } from '../util/sendEmail'

export const onCreateBatch = functions.firestore
  .document(`users/{userId}/purchases/{purchaseId}`)
  .onCreate(async (snapshot, context) => {
    try {
      const batch: any = snapshot.data()
      const message = JSON.stringify(batch.batches)
      const sent = await sendEmail(message)
      return sent
    } catch (error) {
      console.error(error)
      return error
    }
  })
