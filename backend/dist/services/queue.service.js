"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueService = void 0;
const notifications_1 = require("../utils/notifications");
const handlers = {};
exports.queueService = {
    registerHandler(jobType, handler) {
        handlers[jobType] = handler;
    },
    async addJob(jobType, payload, delayMs = 0) {
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
                }
                catch (error) {
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
exports.queueService.registerHandler('sendOrderConfirmation', async (payload) => {
    const { customerEmail, customerPhone, orderNumber } = payload;
    const message = `Thank you for your order #${orderNumber} at Lotchan Mobiles! We'll notify you when it's ready.`;
    if (customerEmail) {
        await (0, notifications_1.sendEmail)(customerEmail, 'Order Confirmation', message);
    }
    if (customerPhone) {
        await (0, notifications_1.sendSMS)(customerPhone, message);
    }
});
exports.queueService.registerHandler('sendRepairStatusUpdate', async (payload) => {
    const { customerEmail, customerPhone, ticketNumber, status } = payload;
    const message = `Repair update for ticket #${ticketNumber}: ${status}. Track at: https://lotchanconnect.com/track`;
    if (customerEmail)
        await (0, notifications_1.sendEmail)(customerEmail, 'Repair Status Update', message);
    if (customerPhone)
        await (0, notifications_1.sendSMS)(customerPhone, message);
});
// Manager handlers
exports.queueService.registerHandler('sendManagerWelcome', async (payload) => {
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
    await (0, notifications_1.sendEmail)(email, subject, body);
});
exports.queueService.registerHandler('sendPasswordReset', async (payload) => {
    const { email, name, tempPassword } = payload;
    const subject = 'Lotchan Mobiles - Password Reset';
    const body = `
Hi ${name},

Your password has been reset. Your new temporary password is: ${tempPassword}

Please log in and change it immediately.

Regards,
Lotchan Mobiles Admin
  `;
    await (0, notifications_1.sendEmail)(email, subject, body);
});
//# sourceMappingURL=queue.service.js.map