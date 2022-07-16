const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
        const mail = { ...data, from: "bambina_nas@yahoo.com" };
        await sgMail.send(mail);
    return true;
}

// const mail = {
//     to: "silvazoua@gmail.com",
//     from: "bambina_nas@yahoo.com",
//     subject: "New user registered",
//     html: "<p>Welcome to our site!</p>"
// }

module.exports = sendMail;