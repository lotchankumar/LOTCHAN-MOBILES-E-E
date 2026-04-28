import { JwtPayload, UserRole } from '../types';
export declare function generateToken(userId: string, email: string, role: UserRole): string;
export declare function verifyToken(token: string): JwtPayload;
export declare function decodeToken(token: string): JwtPayload | null;
//# sourceMappingURL=jwt.d.ts.map