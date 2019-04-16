import EmailService from "../services/email.service";

const email = new EmailService();

export const onCreate = async (user: any) => {
  try {
    const { uid  } = user
    const sendEmail = await email.sendEmail(uid, {
      subject: `Batch Pin Created`,
      html: `<p>Welcome to savease message boody</p>`,
    })
    return sendEmail
  } catch (error) {
    console.error(error)
    return error
  }
}
