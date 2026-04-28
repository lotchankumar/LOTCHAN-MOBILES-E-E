type JobHandler = (payload: any) => Promise<void>;
export declare const queueService: {
    registerHandler(jobType: string, handler: JobHandler): void;
    addJob(jobType: string, payload: any, delayMs?: number): Promise<void>;
};
export {};
//# sourceMappingURL=queue.service.d.ts.map