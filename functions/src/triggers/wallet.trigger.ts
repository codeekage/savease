import EmailService from '../services/email.service'

const email = new EmailService()

export const onCreateBatch = async (snapshot: any, context: any) => {
  try {
    const uid = context.params.purchasesId
    const sendEmail = await email.sendEmail(uid, {
      subject: `Batch Pin Created`,
      html: `<p>${JSON.stringify(snapshot.data())}</p>`,
    })
    return sendEmail
  } catch (error) {
    console.error(error)
    return error
  }
}
