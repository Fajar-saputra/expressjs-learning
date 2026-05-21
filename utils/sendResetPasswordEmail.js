const sendResetPasswordEmail = async (email, resetUrl) => {
    console.log("===================================");
    console.log("📧 EMAIL RESET PASSWORD");
    console.log("===================================");
    console.log(`Kepada     : ${email}`);
    console.log(`Link Reset : ${resetUrl}`);
    console.log("===================================");
    console.log("🔗 Silakan copy link di atas dan buka di browser");
    console.log("Ini hanya simulasi email (mode development)");
    console.log("===================================\n");

    return true;
};

module.exports = {sendResetPasswordEmail};