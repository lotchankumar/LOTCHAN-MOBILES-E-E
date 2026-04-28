import nodemailer from 'nodemailer';

// Configure your email service credentials here
// For development, you can use Gmail, SendGrid, or any SMTP provider
const transporter = nodemailer.createTransport({
  // Example for Gmail (requires "App Password" if 2FA is enabled)
  // service: 'gmail',
  // auth: {
  //   user: process.env.EMAIL_USER || 'your-email@gmail.com',
  //   pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  // }

  // Example for custom SMTP
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  } : undefined
});

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  try {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              color: #333;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              color: #555;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .otp-box {
              background-color: #f0f7ff;
              border: 2px dashed #007bff;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              color: #007bff;
              letter-spacing: 5px;
              font-family: 'Courier New', monospace;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
              color: #856404;
            }
            .footer {
              text-align: center;
              color: #999;
              font-size: 12px;
              margin-top: 30px;
              border-top: 1px solid #eee;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            
            <div class="content">
              <p>Hello Admin,</p>
              <p>You have requested to reset your password for your LOTCHAN MOBILES E-E account.</p>
              <p>Use the One-Time Password (OTP) below to verify your identity:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p><strong>OTP is valid for 15 minutes</strong></p>
              
              <div class="warning">
                ⚠️ <strong>Security Notice:</strong> Never share this OTP with anyone. LOTCHAN MOBILES staff will never ask for your OTP.
              </div>
              
              <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
            </div>
            
            <div class="footer">
              <p>© 2026 LOTCHAN MOBILES. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@lotchanmobiles.com',
      to: email,
      subject: '🔐 Password Reset OTP - LOTCHAN MOBILES',
      html: htmlTemplate,
      text: `Your OTP for password reset is: ${otp}\n\nThis OTP is valid for 15 minutes.\n\nIf you did not request this, please ignore this email.`
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}`);
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    // In development, we'll log the OTP to console if email fails
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[DEV MODE] OTP for ${email}: ${otp}`);
    }
    throw error;
  }
}

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits.charAt(Math.floor(Math.random() * 10));
  }
  return otp;
}
