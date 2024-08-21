import { Queue } from "bullmq";
import { connection } from "./redis";
import type { CreateUser } from "./zod/createUserSchema";

export const testQueue = new Queue<CreateUser>("createUser", {
    connection,
    defaultJobOptions: {
        attempts: 2,
        backoff: {
            type: "exponential",
            delay: 5000,
        },
    },
});
