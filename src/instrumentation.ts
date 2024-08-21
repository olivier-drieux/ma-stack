import { users } from "./lib/drizzle/schema/user";
import type { CreateUser } from "./lib/zod/createUserSchema";

export const register = async () => {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { Worker } = await import("bullmq");
        const { connection } = await import("./lib/redis");
        const { db } = await import("./lib/drizzle/drizzle");

        new Worker<CreateUser>(
            "createUser",
            async (job) => {
                job.log("Creating user...");
                await new Promise((resolve) => setTimeout(resolve, 10000));
                await db.insert(users).values(job.data);
                job.log("User created");
            },
            {
                connection,
                concurrency: 10,
                removeOnComplete: { count: 1000 },
                removeOnFail: { count: 5000 },
            },
        );
    }
};
