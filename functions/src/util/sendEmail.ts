import * as sgMail from '@sendgrid/mail'
import * as firebase from 'firebase'

const API_KEY =
  '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'
export const sendEmail = async (message: string): Promise<any> => {
  try {
    const user = firebase.auth().currentUser
    if (user) {
      const { email } = user
      sgMail.setApiKey(API_KEY)
      const msg = {
        to: email || 'agiriabraham@gmail.com',
        from: 'noreply@us-central1-save-ease.cloudfunctions.net',
        subject: `Batch Pin Created`,
        html: `<p>${message}</p>`,
      }
      const sent = await sgMail.send(msg)
      if (sent) {
        console.log(sent)
        return Promise.resolve(sent)
      }
      return Promise.reject('Failed to send')
    }
    return Promise.reject('Unable to send because may not exist!')
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
