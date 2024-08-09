const nodemailer = require('nodemailer')


const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth : {
            user : process.env.EMAIL_ADRESS,
            pass : process.env.EMAIL_PASSWORD
        }
    })
    transporter.sendMail(mailOptions, (error,info) => {
        if(error) throw new APIError('An error occurred while sending the email.', 500)
        else return true  //* If there is no error, the mail has been sent.
        //console.log(info)
    })
   
}


class MailOption{
    constructor(from, to, subject, text) {
        this.from = from,
        this.to = to,
        this.subject = subject,
        this.text = text
    }
}




module.exports = {
    MailOption,sendMail
}