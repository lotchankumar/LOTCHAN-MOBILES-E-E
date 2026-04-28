export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  // TODO: Integrate with SendGrid, AWS SES, or Nodemailer
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}, Body: ${body}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
}

export async function sendSMS(to: string, message: string): Promise<void> {
  // TODO: Integrate with Twilio, MSG91, or TextLocal
  console.log(`[SMS] To: ${to}, Message: ${message}`);
  await new Promise(resolve => setTimeout(resolve, 100));
}
