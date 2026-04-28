export declare const Role: {
    readonly STAFF: "STAFF";
    readonly MANAGER: "MANAGER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Category: {
    readonly MOBILE: "MOBILE";
    readonly ACCESSORY: "ACCESSORY";
    readonly SIM_CARD: "SIM_CARD";
};
export type Category = (typeof Category)[keyof typeof Category];
export declare const PaymentMethod: {
    readonly CASH: "CASH";
    readonly CARD: "CARD";
    readonly UPI: "UPI";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const SaleStatus: {
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type SaleStatus = (typeof SaleStatus)[keyof typeof SaleStatus];
export declare const RepairStatus: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly DELIVERED: "DELIVERED";
};
export type RepairStatus = (typeof RepairStatus)[keyof typeof RepairStatus];
//# sourceMappingURL=enums.d.ts.map