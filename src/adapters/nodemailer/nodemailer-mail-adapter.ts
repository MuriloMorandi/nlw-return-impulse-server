import { MailAdapter, sendMailData } from "../mail-adapter"
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ff589f75b88f6b",
    pass: "e74e7233cdbd44"
  }
});

export class NodemailerMailAdapter implements MailAdapter{

    async sendMail ({subject, body}: sendMailData) {
        await transport.sendMail({
            from: "Equipe Feedbacks <oi@feedbacks.com>",
            to: "murilomorandialexandre2011@gmail.com",
            subject,
            html: body
    })
    };
}

