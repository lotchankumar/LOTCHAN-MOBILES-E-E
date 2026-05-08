export declare function sendOTPEmail(email: string, otp: string): Promise<void>;
/**
 * Send OTP to an authority (manager/admin) on behalf of a requesting user.
 * The email makes clear who is requesting the reset and the OTP to share with them.
 */
export declare function sendOTPToAuthority(opts: {
    authorityEmail: string;
    authorityName: string;
    requesterEmail: string;
    requesterName: string;
    requesterRole: string;
    otp: string;
}): Promise<void>;
export declare function generateOTP(length?: number): string;
//# sourceMappingURL=email.d.ts.map