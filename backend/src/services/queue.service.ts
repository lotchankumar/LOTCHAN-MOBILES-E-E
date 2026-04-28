import { sendSMS, sendEmail } from '../utils/notifications';
import prisma from '../prisma/client';

type JobHandler = (payload: any) => Promise<void>;

const handlers: Record<string, JobHandler> = {};

export const queueService = {
  registerHandler(jobType: string, handler: JobHandler) {
    handlers[jobType] = handler;
  },

  async addJob(jobType: string, payload: any, delayMs: number = 0) {
    // Process asynchronously without blocking the request
    setImmediate(async () => {
      if (delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
      
      const handler = handlers[jobType];
      if (!handler) {
        console.error(`No handler registered for job type: ${jobType}`);
        return;
      }

      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          await handler(payload);
          console.log(`Job ${jobType} completed successfully`);
          return;
        } catch (error) {
          attempts++;
          console.error(`Job ${jobType} failed (attempt ${attempts}/${maxAttempts}):`, error);
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          }
        }
      }
      console.error(`Job ${jobType} permanently failed after ${maxAttempts} attempts`);
    });
  }
};

// -------- Pre-register notification handlers ----------

queueService.registerHandler('sendOrderConfirmation', async (payload) => {
  const { customerEmail, customerPhone, orderNumber } = payload;
  
  const message = `Thank you for your order #${orderNumber} at Lotchan Mobiles! We'll notify you when it's ready.`;
  
  if (customerEmail) {
    await sendEmail(customerEmail, 'Order Confirmation', message);
  }
  if (customerPhone) {
    await sendSMS(customerPhone, message);
  }
});

queueService.registerHandler('sendRepairStatusUpdate', async (payload) => {
  const { customerEmail, customerPhone, ticketNumber, status } = payload;
  const message = `Repair update for ticket #${ticketNumber}: ${status}. Track at: https://lotchanconnect.com/track`;
  
  if (customerEmail) await sendEmail(customerEmail, 'Repair Status Update', message);
  if (customerPhone) await sendSMS(customerPhone, message);
});

// Manager handlers
queueService.registerHandler('sendManagerWelcome', async (payload) => {
  const { email, name, branchName, tempPassword } = payload;
  const subject = 'Welcome to Lotchan Mobiles - Manager Account Created';
  const body = `
Hi ${name},

Your manager account for Lotchan Mobiles (${branchName}) has been created.

Login URL: https://pos.lotchanmobiles.com/login
Email: ${email}
Temporary Password: ${tempPassword}

Please log in and change your password immediately.

Regards,
Lotchan Mobiles Admin
  `;
  await sendEmail(email, subject, body);
});

queueService.registerHandler('sendPasswordReset', async (payload) => {
  const { email, name, tempPassword } = payload;
  const subject = 'Lotchan Mobiles - Password Reset';
  const body = `
Hi ${name},

Your password has been reset. Your new temporary password is: ${tempPassword}

Please log in and change it immediately.

Regards,
Lotchan Mobiles Admin
  `;
  await sendEmail(email, subject, body);
});
