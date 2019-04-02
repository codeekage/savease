import * as sgMail from '@sendgrid/mail'

export const onCreate = async (user: any) => {
  try {
    const { email, displayName } = user
    sgMail.setApiKey(
      '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'
    )
    const msg = {
      to: email,
      from: 'noreply@us-central1-save-ease.cloudfunctions.net',
      subject: `Welcome to savease`,
      text: `Hey ${displayName} and easy to do anywhere, even with Node.js`,
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    const sent = await sgMail.send(msg)
    if (sent) {
      console.log(sent)
      return sent
    }

    return { erorr: 'failed to send' }
  } catch (error) {
    console.error(error)
    return error
  }
}
