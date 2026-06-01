const nodemailer = require("nodemailer");
const appError = require('./appError');


const sendEmail = async ({
    to,
    subject,
    html
}) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };



// const sendResetPasswordEmail = async (email, resetUrl, name = "") => {
//     try {
//         // Buat transporter (pengirim email)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail', // Bisa diganti: 'hotmail', 'yahoo', dll
//             auth: {
//                 user: process.env.EMAIL_USER,      // Email kamu
//                 pass: process.env.EMAIL_PASSWORD   // App Password (bukan password biasa)
//             }
//         });

//         const mailOptions = {
//             from: `"Support App" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Reset Password - Permintaan Reset Password",
//             html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                     <h2>Halo ${name || 'Sahabat'},</h2>
//                     <p>Kamu menerima email ini karena kami menerima permintaan reset password.</p>
                    
//                     <p style="margin: 30px 0;">
//                         <a href="${resetUrl}" 
//                            style="background-color: #4F46E5; color: white; padding: 12px 24px; 
//                                   text-decoration: none; border-radius: 6px; display: inline-block;">
//                             Reset Password
//                         </a>
//                     </p>

//                     <p><strong>Link ini hanya berlaku selama 15 menit.</strong></p>
//                     <p>Jika kamu tidak meminta reset password, abaikan email ini.</p>
                    
//                     <hr>
//                     <p style="font-size: 12px; color: #666;">
//                         Terima kasih telah menggunakan aplikasi kami.
//                     </p>
//                 </div>
//             `
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`✅ Email reset password berhasil dikirim ke ${email}`);

//     } catch (error) {
//         console.error("❌ Error kirim email:", error);
//         throw new appError("Gagal mengirim email reset password", 500);
//     }
// };

// module.exports = sendResetPasswordEmail;