export const register = async () => {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { Worker } = await import("bullmq");
		const { connection } = await import("./lib/redis");
		const { db } = await import("./lib/drizzle/drizzle");
		const { generatePostJob } = await import("./lib/bullmq/generatePost");

		new Worker<{ id: number }>(
			"generatePost",
			async (job) => generatePostJob(job, db),
			{
				connection,
				concurrency: 10,
				removeOnComplete: { count: 1000 },
				removeOnFail: { count: 5000 },
			},
		);
	}
};
