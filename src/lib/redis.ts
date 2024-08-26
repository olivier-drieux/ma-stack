import Redis from "ioredis";

if (!process.env.REDIS_URL) {
	throw new Error("REDIS_URL is not set");
}

const connection = new Redis(process.env.REDIS_URL, {
	maxRetriesPerRequest: null,
	retryStrategy: (times: number) =>
		Math.max(Math.min(Math.exp(times), 20000), 1000),
});

export { connection };
