const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port:4000,
    secure:false,
    auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASSWORD
    },
    debug: true ,
    logger:true,
    secureConnection:false,
    tls:{
        rejectUnauthorized:true
    }
});

exports.send_email=(req, res, next)=>{
    console.log( process.env.HOST_EMAIL,process.env.HOST_PASSWORD )
    let mailOptions = {
        from: process.env.HOST_EMAIL,
        to: req.body.email,
        subject: 'Reset email',
        text: `For reset password click on ${process.env.LINK_RESET_PASSWORD}`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error occurred:', error);
        } else {
            res.status(200).send({"mes":"yes", "email":req.body.email})
        }
    });
} 