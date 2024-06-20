'use strict'

const nodemailer = require('nodemailer');

class SendEmail {
    constructor(from= 'mutheeal.am@gmail.com', to, subject, text='', html=null) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }

    async useTestSMTP() {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        await transporter.sendMail(this.mailData());
    }

    mailData() {
        return {
            from: `"Moon fish" ${this.from}`, // sender address
            to: this.to, // list of receivers
            subject: `${this.subject} ✔`, // Subject line
            text: this.text, // plain text body
            html: this.html, // html body
        }
    }

    async useGmail() {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_TRANSPORT_USER,
                pass: process.env.GMAIL_TRANSPORT_PASSWORD,
            }
        });

        await transporter.sendMail(this.mailData());
    }
}

module.exports = SendEmail;
