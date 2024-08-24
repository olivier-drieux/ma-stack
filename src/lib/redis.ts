import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL ?? "redis://localhost:6379";
const connection = new Redis(REDIS_URL, {
	maxRetriesPerRequest: null,
	retryStrategy: (times: number) =>
		Math.max(Math.min(Math.exp(times), 20000), 1000),
});

export { connection };
